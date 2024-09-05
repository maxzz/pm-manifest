import { Meta } from "../../../all-types";
import { modifiers } from "./4-mpath-script-keys";
import { EditorDataForOne, EditorDataForKbd, EditorDataForPos, EditorDataForDly, EditorDataForFld } from "./9-types";
import { ScriptInFile } from "./9-types-in-file";

function convertOptions(options: string[]): Record<string, string> {
    const rv: Record<string, string> = {};
    options.forEach(
        (option: string) => {
            const [key, value] = option.split('=');
            rv[key] = value;
        }
    );
    return rv;
}

/**
 * @param chunkValue one of the following:
 *      * "keys,key=ins,repeat=20,mode=sca"
 *      * "field"
 *      * "pos,x=10,y=19"
 *      * "delay,ms=1000"
 */
function parseChunk(chunkValue: string, metaField: Meta.Field): EditorDataForOne | undefined {
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
                editField: {
                    dbname: metaField.mani.dbname,
                    displayname: metaField.mani.displayname,
                    type: metaField.mani.type,
                }
            };
            return rv;
        }
    }
}

export function parseForEditor(fields: Meta.Field[]): EditorDataForOne[] {
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
