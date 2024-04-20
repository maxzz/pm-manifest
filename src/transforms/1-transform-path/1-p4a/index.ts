import { MPath } from "../../../all-types";
import { getPoolName } from "../../2-transform-mani-pool";
import { TransformEncoding } from "../../5-transform-xml-enc";

export function p4a(pool: string[], s: string): MPath.p4a {
    const ss = s.split('.');

    const rv: MPath.p4a = {
        rnumber: 0,
        roleString: getPoolName(pool, ss[1]),
        className: TransformEncoding.cppRestore(getPoolName(pool, ss[2])),
        name: TransformEncoding.cppRestore(getPoolName(pool, ss[3]))
    };

    return rv;
}
