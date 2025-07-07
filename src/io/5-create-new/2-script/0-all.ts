import { type Mani, type Meta, FieldTyp } from "../../../all-types";
import { createGuidWrapped, uuid } from "../../../utils";
import { type ChunkKey, type EditorDataForDly, type EditorDataForFld, type EditorDataForKbd, type EditorDataForPos, type EditorDataForOne, convFieldForEditor } from "../../../transforms";
import { createEmptyValueLife } from "../1-general";

export function createScriptItemByType({ type, password, name }: { type: ChunkKey; password: boolean; name: string; }): EditorDataForOne {
    switch (type) {
        case "fld": {
            const field = createForManualMetaField(password, name);
            const editField = convFieldForEditor(field.mani);
            const newItem: EditorDataForFld = {
                type: 'fld',
                field,
                editField,
            };
            return newItem;
        }
        case "kbd": {
            const newItem: EditorDataForKbd = {
                type: 'kbd',
                char: 'tab',
                repeat: 1,
                shift: 0,
                ctrl: 0,
                alt: 0,
            };
            return newItem;
        }
        case "pos": {
            const newItem: EditorDataForPos = {
                type: 'pos',
                x: 10,
                y: 20,
                units: false,
                res: 0,
            };
            return newItem;
        }
        case "dly": {
            const newItem: EditorDataForDly = {
                type: 'dly',
                n: 1000,
            };
            return newItem;
        }
        default: {
            const really: never = type;
            throw new Error(really);
        }
    }
}

export function createForManualMetaField(password: boolean, name: string): Meta.Field {
    const rv: Meta.Field = {
        mani: createForManualManiField(password, name),
        ftyp: FieldTyp.edit,
        life: createEmptyValueLife({ fType: FieldTyp.edit }),
        path: {},
        pidx: 0,        // profile index is irrelevant for manual fields for now
        previewIdx: 0,  // preview index is irrelevant for manual fields for now
        uuid: uuid.asRelativeNumber(),
    };
    return rv;
}

export function createForManualManiField(password: boolean, name: string): Mani.Field {
    const rv: Mani.Field = {
        type: "edit",
        password,
        useit: true,
        displayname: name,
        dbname: createGuidWrapped(),
    };
    return rv;
}
