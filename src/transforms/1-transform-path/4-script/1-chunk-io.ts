import { Meta, MPath } from "../../../all-types";
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

function prepareFromEditor(v: ScriptChunkEditorData[]): Meta.Field[] {
    const rv: Meta.Field[] = [];
    
    let sum = '';

    for (const chunk of v) {
        if (chunk.type === 'fld') {
            const field = chunk.field as Meta.Field;
            sum += 'field;';
            const newField: Meta.Field = {
                ...field,
            };
            rv.push(newField);
            sum = '';
        }
        else {
            sum += `${chunk.type},${stringifyChunk(chunk)};`;
        }
    }

    if (sum) {
        if (rv.length) {
            const lastField = rv[rv.length - 1];

            lastField.path = lastField.path || {};

            lastField.path.sn = lastField.path.sn || {} as MPath.sn;

            lastField.path.sn.parts = lastField.path.sn?.parts || [];
            lastField.path.sn.parts.push(sum);
        }
    }

    rv.forEach((field, idx) => {
        field.path = field.path || {};
        field.path.sn = field.path.sn || {} as MPath.sn;
        field.path.sn.total = rv.length;
        field.path.sn.current = idx;
    });

    return rv;
}

/*
    inline script::manifestapi::fields_t preparefromeditor(const lines_t& v_)
    {
        script::manifestapi::fields_t rv;

        //1. pack parts separated by fields
        //
        wstring_t sum;
        for (lines_t::const_iterator it=v_.begin(); it!=v_.end(); ++it)
        {
            if ((*it).action == ACTION::field)
            {
                linedata::field_t lfield;
                lfield.set((*it).line);

                sum += L"field;";
                script::manifestapi::field_t field;
                field.enginepath = sum;
                field.field = lfield.fcfield;
                back_inserter(rv) = field;
                sum.clear();
            }
            else
                sum += wstrprintf(L"%s,%s;", lines_io::cast_action((*it).action), (*it).line);
        }
        //1.1. pack last part to last field
        //
        if (!sum.empty())
        {
            if (!rv.empty()) //otherwise bad script
            {
                script::manifestapi::field_t& lastfield = rv.back();
                lastfield.enginepath += sum;
                sum.clear();
            }
        }
        //2. set part numbers
        //
        int partnumber = 0;
        for (script::manifestapi::fields_t::iterator it = rv.begin(); it != rv.end(); ++it)
        {
            (*it).enginepath = wstrprintf(L"[sn]%d.%d.%s", (int)rv.size(), partnumber++, (*it).enginepath);
        }
        /*
        ATLTRACE("\n\n""parts\n");
        for (script::manifestapi::fields_t::const_iterator it=rv.begin(); it!=rv.end(); ++it)
        {
            ATLTRACE("  field = '%S'\n", (*it).enginepath.c_str());
        }
        * /
        return rv;
    }

*/