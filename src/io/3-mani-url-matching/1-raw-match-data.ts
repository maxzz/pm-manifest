import { Options, RawMatchData, How } from "./9-types-utl";
import { TransformEncoding } from "../../transforms";

export function stringifyRawMatchData({ how, opt, url }: RawMatchData, ourl: string): string {
    url = (how !== How.undef ? url || '' : ourl).trim();

    const rv =
        how !== How.undef || opt !== Options.undef
            ? `[m0]:${how}:${opt}:${TransformEncoding.colonEscape(url)}`
            : url;

    return rv;
}

export function parseRawMatchData(murl: string | undefined): RawMatchData {
    const rv: RawMatchData = {
        how: How.undef,
        opt: Options.undef,
        url: murl || '', // don't need call restoreCpp(murl) here.
    };

    const m = murl?.match(reOtsMatching); // TODO: do we need to resrt reOtsMatching.lastIndex before match?
    if (m) {
        rv.how = +m[1] as How;                          // how to match
        rv.opt = +m[2] as Options;                      // options
        rv.url = TransformEncoding.cppRestore(m[3]);    // pattern
    }

    return rv;
}

const reOtsMatching = /^\[m0\]:([0-4]):([01248ace]{1,4}):\s*(.+)/; // 0: [m0]; 1:style; 2:options; 3:pattern. Example: web_murl="[m0]:2:2:https^2dot;//maxzz.github.io/test-pm/"
