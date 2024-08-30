import { Meta } from "../../../all-types";

// Key

export type EditorDataForKbd = Prettify<
    {
        type: 'kbd',                // 'key' in manifest file
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
    type: 'fld',                    // 'field' in manifest file
    field: Meta.Field;
};

// Position

export type EditorDataForPos = {
    type: 'pos',
    x: number;
    y: number;
    units: boolean;                 // dlgunits if false then units='abs'
    res: number;                    // resolution defaults are 0, 96
};

// Delay

export type EditorDataForDly = {
    type: 'dly',                    // 'delay' in manifest file
    n: number;
};

export type EditorDataForOne = Prettify<
    | EditorDataForKbd
    | EditorDataForFld
    | EditorDataForPos
    | EditorDataForDly
>;

export type ChunkKey = EditorDataForOne['type']; // "kbd" | "fld" | "pos" | "dly"
