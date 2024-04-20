import { TransformEncoding } from "../../transforms";
import { Options, RawMatchData, Style } from "./1-types";

const reOtsMatching = /^\[m0\]:([0-4]):([01248ace]{1,4}):\s*(.+)/; // 0: [m0]; 1:style; 2:options; 3:pattern. Example: web_murl="[m0]:2:2:https^2dot;//maxzz.github.io/test-pm/"

export function getMatchRawData(murl: string): RawMatchData {
    const rv = {
        style: Style.undef,
        opt: Options.undef,
        url: murl || '', // don't need call restoreCpp(murl) here.
    };

    const m = murl?.match(reOtsMatching); // TODO: do we need to resrt reOtsMatching.lastIndex before match?
    if (m) {
        rv.style = +m[1] as Style;                      // style
        rv.opt = +m[2] as Options;                      // options
        rv.url = TransformEncoding.cppRestore(m[3]);    // pattern
    }

    return rv;
}

export function makeRawMatchData({ style, opt, url }: RawMatchData, ourl: string): string {
    url = (style !== Style.undef ? url || '' : ourl).trim();

    const rv =
        style !== Style.undef || opt !== Options.undef
            ? `[m0]:${style}:${opt}:${TransformEncoding.colonEscape(url)}`
            : url;

    return rv;
}
