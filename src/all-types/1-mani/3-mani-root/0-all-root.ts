import { Form } from "../2-mani-form";

// Manifest types

export type Descriptor = {
    id: string;                     // "{fe94ea4f-ac76-4f7d-9c74-fa14abca889b}"
    created: string;                // "1d57495 61c6f733"
    modified: string;               // "1d57496 87bed3e8",
    integrity?: string;             // "OTS2.056a41167041b1ea2c529494aeb606d0e" // optional and not used for a long time
    version: string;                // "2.4.3"; starting 09.23.24 with pmat25 it will be "2.4.5"
};

export namespace Customization {
    export type Process = {
        name: string;               // process name like 'outlook.exe'
        type: string;               // 'skip'
    };
    export type Options = {
        processes: Process[];
    };
}

export type Manifest = {
    descriptor: Descriptor;
    options?: Customization.Options;
    forms: Form[];
};
