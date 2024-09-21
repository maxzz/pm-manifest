import { type MPath } from "../../../all-types";
import { type EditorDataForOneAndSn, type EditorDataForOne } from "./9-types";
import { modifiers } from "./4-mpath-script-keys";

function stringifyChunk(chunk: EditorDataForOne): string {
    switch (chunk.type) {
        case 'kbd': {
            const mods = modifiers.toString(modifiers.numbersToModifiers(chunk));
            let rv = `keys,key=${chunk.char}`;
            if (chunk.repeat !== 1) {
                rv += `,repeat=${chunk.repeat}`;
            }
            if (mods) {
                rv += `,mode=${mods}`;
            }
            return rv;
        }
        case 'pos': {
            let rv = `pos,x=${chunk.x},y=${chunk.y}`;
            if (!chunk.units) {
                rv += ',units=abs';
            }
            if (chunk.res !== 0 && chunk.res !== 96) {
                rv += `,res=${chunk.res}`;
            }
            return rv;
        }
        case 'dly': {
            return `delay,ms=${chunk.n}`;
        }
        case 'fld': {
            return 'field';
        }
    }
}

export function stringifyFromEditor(chunks: EditorDataForOne[]): EditorDataForOneAndSn[] { // former: preparefromeditor()
    const rv: EditorDataForOneAndSn[] = [];

    let partsAcc: string[] = [];

    for (const chunk of chunks) {
        if (chunk.type === 'fld') {
            partsAcc.push('field');

            const newItem: EditorDataForOneAndSn = {
                chunk,
                sn: {
                    total: 0,
                    current: 0,
                    parts: partsAcc,
                },
            };
            rv.push(newItem);

            partsAcc = [];
        }
        else {
            partsAcc.push(stringifyChunk(chunk));
        }
    }

    if (partsAcc.length && rv.length) {
        const lastField = rv[rv.length - 1];
        lastField.sn.parts.push(...partsAcc);
    }

    rv.forEach(
        (field, idx) => {
            field.sn.total = rv.length;
            field.sn.current = idx;
        }
    );

    return rv;
}

export function mergeSn(sn: MPath.sn): string {
    return `[sn]${sn.total}.${sn.current}.${sn.parts.join(';')};`;
}
