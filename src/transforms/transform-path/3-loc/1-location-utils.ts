import { MPath, Meta } from "../../../all-types";

function str2loc(v: string): MPath.loc {
    let [x, y, x2, y2] = v.split(' ').map(str => +str);
    return { x, y, w: x2 - x, h: y2 - y };
}

function loc2str(loc: MPath.loc): string {
    return `${loc.x} ${loc.y} ${loc.x + loc.w} ${loc.y + loc.h}`;
}

//export namespace utils {
    export function rectsBoundaries(rects: MPath.loc[]): Meta.Bounds {
        let x1 = Number.MAX_SAFE_INTEGER;
        let y1 = Number.MAX_SAFE_INTEGER;
        let x2 = 0;
        let y2 = 0;
        rects.forEach(({ x, y, w, h }) => {
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
        });
        return { x1, y1, x2, y2 };
    }

    export function buildPreviewData(fields: Meta.Field[]): Meta.View {
        let uniqueLocs = new Set<string>();

        fields.forEach((field) => { //console.log(`field.path.loc: ${field.path.loc}`);
            const fieldLocs = (field.path.loc || '').split('|');
            fieldLocs.forEach(loc => uniqueLocs.add(loc));
            field.ridx = fieldLocs[fieldLocs.length - 1] as any; // temp store string as number
        });

        let rects = Array.from(uniqueLocs).map(str2loc).filter(loc => loc.w || loc.h);
        let bounds = rectsBoundaries(rects);

        const rectStrs = rects.map(loc2str);
        fields.forEach((field) => {
            field.ridx = rectStrs.findIndex((locStr) => locStr === field.ridx as any); // restore str to number
            rects[field.ridx] && (rects[field.ridx].f = 1);
        });

        return { rects, bounds, };
    }

//} //namespace utils