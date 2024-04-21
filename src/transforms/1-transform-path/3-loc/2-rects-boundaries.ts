import { MPath, Meta } from "../../../all-types";

export function rectsBoundaries(rects: MPath.loc[]): Meta.Bounds {
    let x1 = Number.MAX_SAFE_INTEGER;
    let y1 = Number.MAX_SAFE_INTEGER;
    let x2 = 0;
    let y2 = 0;

    rects.forEach(
        ({ x, y, w, h }) => {
            if (x1 > x) {
                x1 = x;
            }

            if (y1 > y) {
                y1 = y;
            }

            if (x2 < x + w) {
                x2 = x + w;
            }
            
            if (y2 < y + h) {
                y2 = y + h;
            }
        }
    );

    return { x1, y1, x2, y2 };
}
