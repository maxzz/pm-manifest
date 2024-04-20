import { MPath } from "../../../all-types";
import { getPoolName } from "../../transform-mani-pool";
import { TransformEncoding } from "../../transform-xml-enc";

export function sid(pool: string[], v: string): MPath.sid {
    let sid = {} as any;

    v.split('.')
        .forEach(
            (_, idx) => {
                let s = TransformEncoding.cppRestore(getPoolName(pool, _));
                switch (idx) {
                    case 0: sid.version = s; break;
                    case 1: sid.generatedId = s; break;
                    case 2: sid.formName = s; break;
                    case 3: sid.formAttrs = s; break;
                    case 4: sid.outerHtml = s; break;
                    default: sid[idx] = s;
                }
            }
        );

    return sid;
}
