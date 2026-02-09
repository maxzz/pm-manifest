import { type Mani, type Meta, FieldTyp } from "../../../all-types";
import { createGuidWrapped, uuid } from "../../../utils";
import { type ChunkKey, type EditorDataForDly, type EditorDataForFld, type EditorDataForKbd, type EditorDataForPos, type EditorDataForOne, convFieldForEditor } from "../../../transforms";
import { createEmptyValueLife } from "../1-general";

export function createScriptItemByType({ formIdx, type, password, name }: { formIdx: number; type: ChunkKey; password: boolean; name: string; }): EditorDataForOne {
    switch (type) {
        case "fld": {
            return createScriptItem_fld({ formIdx, password, name });
        }
        case "kbd": {
            return createScriptItem_kbd();
        }
        case "pos": {
            return createScriptItem_pos();
        }
        case "dly": {
            return createScriptItem_dly();
        }
        default: {
            const really: never = type;
            throw new Error(really);
        }
    }
}

// Key, Position, Delay

export function createScriptItem_kbd({ char = 'tab', repeat = 1, shift = 0, ctrl = 0, alt = 0 }: Partial<Omit<EditorDataForKbd, 'type'>> = {}): EditorDataForKbd {
    const newItem: EditorDataForKbd = { type: 'kbd', char, repeat, shift, ctrl, alt, };
    return newItem;
}

export function createScriptItem_pos({ x = 60, y = 10, units = false, res = 0 }: Partial<Omit<EditorDataForPos, 'type'>> = {}): EditorDataForPos {
    const newItem: EditorDataForPos = { type: 'pos', x, y, units, res, };
    return newItem;
}

export function createScriptItem_dly({ n = 1000 }: Partial<Omit<EditorDataForDly, 'type'>> = {}): EditorDataForDly {
    const newItem: EditorDataForDly = { type: 'dly', n, };
    return newItem;
}

// Field

export function createScriptItem_fld({ formIdx, password, name }: { formIdx: number; password: boolean; name: string; }): EditorDataForFld {
    const field = createForManualMetaField( formIdx, password, name);
    const editField = convFieldForEditor(field.mani);
    const newItem: EditorDataForFld = {
        type: 'fld',
        field,
        editField,
    };
    return newItem;
}

export function createForManualMetaField(formIdx: number,password: boolean, name: string): Meta.Field {
    const uuidThis = uuid.asRelativeNumber();
    const rv: Meta.Field = {
        mani: createForManualManiField(formIdx, uuidThis, password, name),
        ftyp: FieldTyp.edit,
        life: createEmptyValueLife({ fType: FieldTyp.edit }),
        path: {},
        pidx: 0,        // profile index is irrelevant for manual fields for now
        previewIdx: 0,  // preview index is irrelevant for manual fields for now
        uuid: uuidThis,
    };
    return rv;
}

export function createForManualManiField(formIdx: number, uuidThis: number, password: boolean, name: string): Mani.Field {
    const dbname = createGuidWrapped();
    const rv: Mani.Field = {
        type: "edit",
        password,
        useit: true,
        displayname: name,
        dbname,
        memOnly: { formIdx, uuidThis, uuidLoginFld: 0, dbnameInitial: dbname },
    };
    return rv;
}
