export namespace ScriptInFile {

    export type ChunkKey = 'keys' | 'field' | 'pos' | 'delay';

    export type Key = {
        key: string;
        repeat?: string; // number
        mode?: string;
    };

    export type Field = {};

    export type Pos = {
        x: string; // number
        y: string; // number
        units?: string; // "dlg"
        res?: string; // number, resolution
    };

    export type Delay = {
        ms: string; // number
    };
}
