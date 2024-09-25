import { Field } from "../1-mani-field";

// Form types

export enum FORMNAME {              // predefined form names
    noname = -1,
    signon = 0,
    pchange = 1,
    fieldcatalog = -2,
}

export type FContext = {
    type: 'pchange';
    name: number;                   // "1"
};

export type Detection = {
    //windowtitle_t
    //matchtype?: string;           // is taken from caption as '[m0]:2:2:' | [m0]:2:1: | '[m0]:2:3:': "full" | "left" | "right" | "both"
    caption?: string;
    variablecaption?: string;       // If variablecaption is not empty and different from caption field then we are using vcm (variable cation match)

    //web_detection_t
    web_ourl?: string;              // The original URL. This should not be edited
    web_murl?: string;              // URL for matching. Admin can edit it and after that App may become not not Web any more.
    web_qurl?: string;              // URL for quicklink
    web_checkurl?: boolean;         // "1" // The same story as murl. Somebody clean qurl if we are not using Quicklinks. But we should use this flag instead of cleaning qurl.

    //dlg_detection_t
    dlg_tab?: string;
    dlg_class?: string;
    dlg_checkexe?: boolean;         // "1" matchprocessname: Whether to perform process name match for autoamtic logons or not. Process name match is always done for manual mode logons.

    //emu_detection_t
    emu_pattern?: string;           // screen pattern to match

    names?: string;                 // names is a string pool of all strings for this form. used by ots engine
    names_ext?: string;
    monitor?: boolean;              // "1" this defines: do the live monitor of the form content for this form or don't do it

    processname?: string;           // name of the process
    commandline?: string;           // commandline of the current process; TBD: may be allow to run .bat files or add option to set working directory
};

export type Options = {
    choosename?: string;
    sidekick?: string;              // "manual mode hint"
    ownernote?: string;
    quicklink?: string;             // QL menu name
    auth_pl?: string;               // extended policy (see AuthTokenValues); only one bit as hex string (auth_pl="100"); used only for login form
    balooncount?: string;           // number of times to show baloon; -1: never, 0: always. Name with typo got into file format, so keep it as is.
    autoprompt?: string;            // boolean
    lockfields?: string;            // "0" | "1"
    submittype?: string;            // "dosubmit" | "nosubmit" We have this information only if it was said in clear, i.e. no defaults, or guesses. // export type SubmitType = 'dosubmit' | 'nosubmit' | undefined;
    iconkey?: string;               // Any name not necessarily unique
    iconlocation?: string;          // Format is the same as described into feedback_drawing.h. "Q:0:0:0"
    usequicklink?: string;          // ("1" | "usequicklink") | ("2" | "dontusequicklink")
    recheckwindowafterfillin?: string; // boolean
    qlwocred?: string;              // boolean. Quick reauthentication enable/disable (QL wo/ crededntials).
    unknownattributes?: string;     //
};

export type Form = {
    fcontext?: FContext;
    detection: Detection;
    options: Options;
    fields: Field[];
};
