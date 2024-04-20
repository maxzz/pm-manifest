import { getMatchRawData } from "./3-raw-match-data";

export * from "./1-types";
export * from "./2-regexes";
export * from "./3-raw-match-data";

//export namespace Matching {

function styleName(style: number): string {
    const names: Record<number, string> = {
        1: 'use domain match',            // Style.makeDomainMatch
        2: 'regex',                       // Style.regex
        3: 'wildcard',                    // Style.wildcard
        4: 'don\'t match this in domain', // Style.skipDomainMatch
    };
    return names[style] || `${style}`;
}

export function getMatchInfo(murl: string): { prefix: string; join: string; url: string; } | undefined {
    const raw = getMatchRawData(murl);
    if (raw.style || raw.opt) {
        const { style, opt, url } = raw;

        let resOpt: string[] = [];
        (opt & 1) !== 0 && (resOpt.push('case insensitive'));   // Options.caseinsensitive
        (opt & 2) !== 0 && (resOpt.push('match ext.'));         // Options.matchtext

        let resStyle = styleName(style);
        return {
            prefix: `[m0]:${style}:${opt}`,
            join: `${resStyle}${resOpt.length ? `; Options: ${resOpt.join(', ')}` : ''}`,
            url,
        };
    }
}

//} //namespace Matching
