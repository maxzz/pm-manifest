import { Meta, MPath } from "../../../all-types";
import { modifiers } from "./4-mpath-script-keys";
import { ScriptChunkEditorData } from "./9-types";

function stringifyChunk(chunk: ScriptChunkEditorData): string {
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

//TODO: test it
export function stringifyFromEditor(chunks: ScriptChunkEditorData[]): Meta.Field[] { // former: preparefromeditor()
    const rv: Meta.Field[] = [];

    let acc: string[] = [];

    for (const chunk of chunks) {
        if (chunk.type === 'fld') {
            const field = chunk.field as Meta.Field;

            acc.push('field');

            const newField: Meta.Field = {
                ...field,
            };

            newField.path = newField.path || {};
            newField.path.sn = newField.path.sn || {} as MPath.sn;
            newField.path.sn.parts = acc;
            acc = [];

            rv.push(newField);
        }
        else {
            acc.push(stringifyChunk(chunk));
        }
    }

    if (acc.length && rv.length) {
        const lastField = rv[rv.length - 1];

        lastField.path = lastField.path || {};
        lastField.path.sn = lastField.path.sn || {} as MPath.sn;

        lastField.path.sn.parts = lastField.path.sn?.parts || [];
        lastField.path.sn.parts.push(...acc);
    }

    rv.forEach((field, idx) => {
        field.path = field.path || {};
        field.path.sn = field.path.sn || {} as MPath.sn;
        field.path.sn.total = rv.length;
        field.path.sn.current = idx;
    });

    //TODO: combine every path.sn with ';' separator
    return rv;
}

// function stringifyChunks(chunks: ScriptChunkEditorData[]): string[] {
//     return chunks.map(stringifyChunk);
// }

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