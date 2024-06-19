import { Meta } from "../../../all-types";
import { ChunkTuple, getChunks } from "./1-get-chunks";
import { p4a } from "../1-p4a";
import { sid } from "../2-sid";
import * as path_loc from "../3-loc";
import { scriptParts } from "../4-script";

export namespace FieldPath {

    export const loc = path_loc;

    export function fieldPathItems(pool: string[], path: string): Meta.Path {
        const acc: Meta.Path = {};
        const chunks: ChunkTuple[] = getChunks(path);

        chunks.forEach(
            ([chunkName, chunkValue]) => {
                switch (chunkName) {
                    case 'p4a':
                    case 'p4': {
                        acc.p4a = chunkValue.split('|').map(_ => p4a(pool, _));
                        break;
                    }
                    case 'loc': {
                        acc.loc = loc.unPool(pool, chunkValue).join('|');
                        break;
                    }
                    case 'sid': {
                        acc.sid = sid(pool, chunkValue);
                        break;
                    }
                    case 'did2': {
                        acc.did2 = chunkValue;
                        break;
                    }
                    case 'sn': {
                        acc.sn = scriptParts(chunkValue);
                        break;
                    }
                    default: {
                        console.error('??????path??????');
                    }
                }
            }
        );

        return acc;
    }

}
