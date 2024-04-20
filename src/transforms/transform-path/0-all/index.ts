import { Meta } from "../../../all-types";
import { p4a } from "../1-p4a";
import { sid } from "../2-sid";
import * as path_loc from "../4-loc";

export namespace FieldPath {

    export const loc = path_loc;

    type ChunkTuple = [Meta.Chunk, string];

    function getChunks(path: string): ChunkTuple[] {
        // 0. Convert: 
        //      [p4a]0.0.1.|0.2.1.[loc]b|c[sid]14.15.16..17 -> 
        //      ['p4a', '0.0.1.|0.2.1.'], ['loc', 'b|c'], ['sid', '14.15.16..17']
        //
        return path.split('[').filter(Boolean).map((val: string) => val.split(']') as ChunkTuple);
    }

    export function fieldPathItems(pool: string[], path: string): Meta.Path {
        const acc: Meta.Path = {};
        const chunks: ChunkTuple[] = getChunks(path);

        chunks.forEach(([chunkName, chunkValue]) => {
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
                    acc.sn = {
                        total: 0,
                        current: 0,
                        parts: [],
                    };
                    let ss = chunkValue.split(';');
                    if (ss.length) {
                        let first = ss[0].split('.'); // '3.0.the-rest'
                        if (first.length > 2) {
                            acc.sn.total = +first[0];
                            acc.sn.current = +first[1];
                            ss[0] = first[2];
                        }
                        acc.sn.parts = ss.filter(Boolean);
                    }
                    break;
                }
                default: {
                    console.error('??????path??????');
                }
            }
        });

        return acc;
    } //fieldPathItems()

} //namespace FieldPath
