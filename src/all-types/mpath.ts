export module MPath {           // Meta path. Manifest unpacked path data

    export type p4a = {         // Chunk: p4a (from: unpack_fromstring())
        rnumber: number;
        roleString: string;
        className: string;
        name?: string;
    };

    export type p4 = p4a;       // Chunk: p4

    export type sid = {         // Chunk: sid
        version: string;
        generatedId: string;
        formName: string;
        formAttrs?: string;
        outerHtml?: string;
    };

    export type did2 = {        // Chunk: did2
        s1: string;
        s2: string;
        s3: string;
        s4?: string;
    };

    export type loc = {         // Chunk: loc (size is in client area or against 1920x1200 or 1600x1200?)
        x: number;
        y: number;
        w: number;
        h: number;
        f?: number;             // 0 | 1 if the last element in field (this is internal and not saved).
        i?: number;             // index of rect before dedupe (this is internal and not saved).
    };

    export type sn = {          // Chunk: sn
        total: number;          // total blocks
        current: number;        // current block
        parts: string[];        // block parts
    };

} //module MPath
