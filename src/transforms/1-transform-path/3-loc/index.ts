import { getPoolName } from "../../2-transform-mani-pool";
import * as loc_utils from "./1-location-utils";

export const utils = loc_utils;

// export namespace loc {
    export function unPool(pool: string[], v: string): string[] {
        return (v.split('|').map(idx => getPoolName(pool, idx)));
    }

    export type RectTuple = readonly [aX: number, aY: number, bX: number, bY: number];

    export function getControlRect(pathLoc: string | undefined): RectTuple | undefined {
        const loc = pathLoc?.split('|')?.at(-1);
        const arr = loc?.split(' ').map((item)=>+item).filter((item) => item && !isNaN(item)); // check if some are 0 or NaN
        if (arr?.length === 4) {
            if (arr[0] > arr[2]) {
                [arr[2], arr[0]] = [arr[0], arr[2]];
            }
            if (arr[1] > arr[3]) {
                [arr[3], arr[1]] = [arr[1], arr[3]];
            }
            return arr as unknown as RectTuple;
        }
    }

// } //namespace loc
