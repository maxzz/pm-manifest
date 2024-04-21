import { MPath } from "../../../all-types";

export function scriptParts(chunkValue: string): MPath.sn {
    
    const sn: MPath.sn = {
        total: 0,
        current: 0,
        parts: [],
    };

    const ss = chunkValue.split(';');
    
    if (ss.length) {
        const first = ss[0].split('.'); // '3.0.the-rest'
       
        if (first.length > 2) {
            sn.total = +first[0];
            sn.current = +first[1];
            ss[0] = first[2];
        }

        sn.parts = ss.filter(Boolean);
    }

    return sn;
}
