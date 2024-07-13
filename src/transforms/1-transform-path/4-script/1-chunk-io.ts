import { modifiers } from "./4-mpath-script-keys";
import { ScriptChunkEditorData, ScriptInFile, EditorDataForKbd, EditorDataForPos, EditorDataForDly } from "./9-types";

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

export function parseChunk(chunkValue: string): ScriptChunkEditorData | undefined {
    const ss = chunkValue.split(',');
    const [key, ...rest] = ss;
    switch (key) {
        case 'keys':
            {
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
        case 'field':
            return { type: 'fld', id: '' };
        case 'pos':
            {
                const obj = convertOptions(rest) as ScriptInFile.Pos;
                const x = +(obj.x || '0');
                const y = +(obj.y || '0');
                const rv: EditorDataForPos = {
                    type: 'pos',
                    x: isNaN(x) ? 0 : x,
                    y: isNaN(y) ? 0 : y,
                };
                return rv;
            }
        case 'delay':
            {
                const obj = convertOptions(rest) as ScriptInFile.Delay;
                const n = +(obj.ms || '0');
                const rv: EditorDataForDly = {
                    type: 'dly',
                    n: isNaN(n) ? 0 : n,
                };
                return rv;
            }
    }
}

export function parseChunks(chunks: string[]): ScriptChunkEditorData[] {
    return chunks.map(parseChunk).filter((chunk): chunk is ScriptChunkEditorData => !!chunk);
}

export function stringifyChunk(chunk: ScriptChunkEditorData): string {
    switch (chunk.type) {
        case 'kbd':
            {
                const mods = modifiers.toString(modifiers.numbersToModifiers(chunk));
                return `keys,key=${chunk.char},repeat=${chunk.repeat},mode=${mods}`;
            }
        case 'fld':
            return 'field';
        case 'pos':
            return `pos,x=${chunk.x},y=${chunk.y}`;
        case 'dly':
            return `delay,ms=${chunk.n}`;
    }
}

export function stringifyChunks(chunks: ScriptChunkEditorData[]): string[] {
    return chunks.map(stringifyChunk);
}
