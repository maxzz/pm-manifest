// Key

export type KeyModifierNumbers = {
    shift: number;
    ctrl: number;
    alt: number;
};

export type EditorDataForKbd = Prettify<
    & {
        type: 'kbd', // 'key'
        char: string;
        repeat: number;
    }
    & KeyModifierNumbers
>;

// Field

export type EditorDataForFld = {
    type: 'fld', // 'field'
    id: string;
};

// Position

export type EditorDataForPos = {
    type: 'pos',
    x: number;
    y: number;
};

// Delay

export type EditorDataForDly = {
    type: 'dly', // 'delay'
    n: number;
};

export type ScriptChunkEditorData = Prettify<
    | EditorDataForKbd
    | EditorDataForFld
    | EditorDataForPos
    | EditorDataForDly
>;

export type ChunkKey = ScriptChunkEditorData['type'];
