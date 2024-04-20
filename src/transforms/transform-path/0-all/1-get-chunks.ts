import { Meta } from "../../../all-types";

export type ChunkTuple = [Meta.Chunk, string];

/**
 * ```
 // Convert: 
 //   [p4a]0.0.1.|0.2.1.[loc]b|c[sid]14.15.16..17 -> 
 //   [      
 //     ['p4a', '0.0.1.|0.2.1.'], 
 //     ['loc', 'b|c'], 
 //     ['sid', '14.15.16..17'],
 //   ]
 * ```
 */
export function getChunks(path: string): ChunkTuple[] {
    return path
        .split('[')
        .filter(Boolean)
        .map((val: string) => val.split(']') as ChunkTuple);
}
