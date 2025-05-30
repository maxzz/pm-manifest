import { MPath, Meta } from "../../../all-types";
import { rectsBoundaries } from "./2-rects-boundaries";

export * from './2-rects-boundaries';

export function buildPreviewData(fields: Meta.Field[]): Meta.View {
    const uniqueLocs = new Set<string>();

    fields.forEach(
        (field) => {
            const fieldLocs = (field.path.loc || '').split('|');
            fieldLocs.forEach((loc) => uniqueLocs.add(loc));
            field.previewIdx = fieldLocs[fieldLocs.length - 1] as any; // temp store string as number
        }
    );

    const nonEmptyRects = Array.from(uniqueLocs).map(str2loc).filter((loc) => loc.w || loc.h);
    const bounds = rectsBoundaries(nonEmptyRects);

    const rectStrs = nonEmptyRects.map(loc2str);

    fields.forEach(
        (field) => {
            field.previewIdx = rectStrs.findIndex((locStr) => locStr === field.previewIdx as any); // restore str to number
            
            nonEmptyRects[field.previewIdx] && (nonEmptyRects[field.previewIdx].f = 1);
        }
    );

    const rv: Meta.View = {
        rects: nonEmptyRects,
        bounds,
    };

    return rv;
}

function str2loc(v: string): MPath.loc {
    let [x, y, x2, y2] = v.split(' ').map(str => +str);
    return { x, y, w: x2 - x, h: y2 - y };
}

function loc2str(loc: MPath.loc): string {
    return `${loc.x} ${loc.y} ${loc.x + loc.w} ${loc.y + loc.h}`;
}
