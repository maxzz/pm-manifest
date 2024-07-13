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
export type ChunkFileKey = 'keys' | 'field' | 'pos' | 'delay';

export namespace ScriptInFile {
    export type Key = {
        key: string;
        repeat?: string;    // number
        mode?: string;
    };

    export type Field = {
    };

    export type Pos = {
        x: string;          // number
        y: string;          // number
        units?: string;     // "dlg"
        res?: string;       // number, resolution
    };

    export type Delay = {
        ms: string;         // number
    };
}
