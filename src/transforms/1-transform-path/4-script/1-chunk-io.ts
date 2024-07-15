import { Meta } from "../../../all-types";
import { modifiers } from "./4-mpath-script-keys";
import { ScriptChunkEditorData, EditorDataForKbd, EditorDataForPos, EditorDataForDly, EditorDataForFld } from "./9-types";
import { ScriptInFile } from "./9-types-in-file";

function convertOptions(options: string[]): Record<string, string> {
    const rv: Record<string, string> = {};
    options.forEach((option: string) => {
        const [key, value] = option.split('=');
        rv[key] = value;
    });
    return rv;
}

/**
 * @param chunkValue one of the following:
 *      * "keys,key=ins,repeat=20,mode=sca"
 *      * "field"
 *      * "pos,x=10,y=19"
 *      * "delay,ms=1000"
 */
export function parseChunk(chunkValue: string, metaField: Meta.Field): ScriptChunkEditorData | undefined {
    const pieces = chunkValue.split(',');
    const [key, ...rest] = pieces;
    switch (key) {
        case 'keys': {
            const obj = convertOptions(rest) as ScriptInFile.Key;
            const mods = modifiers.fromString(obj.mode || '');
            const rep = +(obj.repeat || '0');
            const rv: EditorDataForKbd = {
                type: 'kbd',
                char: obj.key || '',
                repeat: isNaN(rep) ? 0 : rep,
                ...modifiers.modifiersToNumbers(mods),
            };
            return rv;
        }
        case 'pos': {
            const obj = convertOptions(rest) as ScriptInFile.Pos;
            const x = +(obj.x || '0');
            const y = +(obj.y || '0');
            const dlgunits = obj.units !== 'abs';
            const rv: EditorDataForPos = {
                type: 'pos',
                x: isNaN(x) ? 0 : x,
                y: isNaN(y) ? 0 : y,
                units: dlgunits,
                res: 0,
            };
            return rv;
        }
        case 'delay': {
            const obj = convertOptions(rest) as ScriptInFile.Delay;
            const n = +(obj.ms || '0');
            const rv: EditorDataForDly = {
                type: 'dly',
                n: isNaN(n) ? 0 : n,
            };
            return rv;
        }
        case 'field': {
            const rv: EditorDataForFld = {
                type: 'fld',
                field: metaField,
            };
            return rv;
        }
    }
}

export function stringifyChunk(chunk: ScriptChunkEditorData): string {
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

export function stringifyChunks(chunks: ScriptChunkEditorData[]): string[] {
    return chunks.map(stringifyChunk);
}

export function parseForEditor(fields: Meta.Field[]): ScriptChunkEditorData[] {
    const rv = fields.map(
        (field: Meta.Field) => {
            const chunks = field.path?.sn?.parts
                .map((part: string) => parseChunk(part, field))
                .filter(Boolean) || [];
            return chunks;
        }
    ).flat();
    return rv;
}

//TODO: test it
export function stringifyFromEditor(chunks: ScriptChunkEditorData[]): Meta.Field[] {
    const rv = chunks.reduce(
        (acc: Meta.Field[], chunk: ScriptChunkEditorData) => {
            if (chunk.type === 'fld') {
                acc.push(chunk.field as Meta.Field);
            }
            return acc;
        },
        []
    );
    return rv;
}
