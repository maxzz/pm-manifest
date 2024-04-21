export enum Style {         // cannot use const w/ esbuild
    undef = 0,
    makeDomainMatch = 1,    // That means match the url as string (i.e. not regex or wildcard). this should have prefix '[m0]:1:0:', but unfortunately it is used without prefix as raw murl.
    regex = 2,
    wildcard = 3,
    skipDomainMatch = 4,    // This is exactly string content match i.e. skip domain match. this should have prefix '[m0]:4:0:'
}

export enum Options {       // cannot use const w/ esbuild
    undef = 0,
    caseinsensitive = 0x0001, // This option does not make sense for URLs (even for wildcards).
    matchtext = 0x0002,       // match text or don't; This option does not make sense for URLs.
    usequery = 0x0004,        // match text or don't; This option does not make sense for URLs.
    pmacSet = 0x0008,         // set manually by pmac utility.
}

export type RawMatchData = {
    style: Style;
    opt: Options;
    url: string;
};
