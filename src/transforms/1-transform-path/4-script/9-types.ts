import { type MPath, type EditorField, type Meta } from "../../../all-types";

// Key

export type EditorDataForKbd = Prettify<
    {
        type: 'kbd',                    // 'key' in manifest file
        char: string;
        repeat: number;
    }
    & KeyModifierNumbers
>;

export type KeyModifierNumbers = {
    shift: number;
    ctrl: number;
    alt: number;
};

// Field

export type EditorDataForFld = {
    type: 'fld',                        // 'field' in manifest file
    field: Meta.Field;                  // Meta.Field created from manifest file
    editField: EditorField.ForAtoms;    // manifest field for editing from editors
};

// Position

export type EditorDataForPos = {
    type: 'pos',
    x: number;
    y: number;
    units: boolean;                     // dlgunits if false then units='abs'
    res: number;                        // resolution defaults are 0, 96
};

// Delay

export type EditorDataForDly = {
    type: 'dly',                        // 'delay' in manifest file
    n: number;
};

export type EditorDataForOne = Prettify<
    | EditorDataForKbd
    | EditorDataForFld
    | EditorDataForPos
    | EditorDataForDly
>;

export type EditorDataForOneAndSn = {   // This is returned from stringifyFromEditor()
    chunk: EditorDataForFld;
    sn: MPath.sn;
};

export type ChunkKey = EditorDataForOne['type']; // "kbd" | "fld" | "pos" | "dly"
