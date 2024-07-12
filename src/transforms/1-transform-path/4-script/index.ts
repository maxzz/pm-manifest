import { MPath } from "../../../all-types";

export function scriptParts(chunkValue: string): MPath.sn {
    
    const rv: MPath.sn = {
        total: 0,
        current: 0,
        parts: [],
    };

    const ss = chunkValue.split(';'); // "3.0.keys,key=ins,repeat=20,mode=sca;pos,x=10,y=19;field;delay,ms=1000"
    
    if (ss.length) {
        const firstPiece = ss[0].split('.'); // "3.0.keys,key=ins,repeat=20,mode=sca"
       
        if (firstPiece.length > 2) {
            rv.total = +firstPiece[0];
            rv.current = +firstPiece[1];
            ss[0] = firstPiece[2];
        }

        rv.parts = ss.filter(Boolean);
    }

    return rv;
}
