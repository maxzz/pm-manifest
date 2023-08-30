export module Mani {
    export type FieldTypeStr = 'edit' | 'button' | 'list' | 'combo' | 'check' | 'radio' | 'text' | 'listbx';

    export interface FieldValueValue {
        value?: string;
        choosevalue?: string;   // This does not exist in field catalog yet but we can added it to field catalog (as 2023 extension).
        password?: boolean,     // In file it's "1". Only field catalog or manual mode can change this value.
        askalways?: boolean,    // In file it's "1".
        onetvalue?: boolean,    // In file it's "1".
    }

    export interface FieldValueIds {
        displayname: string,    // It should be '' if undefined (for localization) and empty won't be stored in file. In filed catalog this is "dispname" and is required so we mark it here as required.
        dbname: string;
    }

    export type FieldValue = FieldValueValue & FieldValueIds;

    export interface Field extends FieldValue {
        type: FieldTypeStr;     // This does not exist in field catalog

        path_ext?: string;
        policy?: string;        // this is standard rule: "[p4]g:8:8:withspecial:different_ap"
        policy2?: string;       // this is custom rule like: "[e1]g:(a{4,4}d{2,2}A{1,1}[@#$%!]{1,1})&lt;8,8&gt;"; both can present at the same time

        submit?: boolean,       // "1"
        useit?: boolean,        // "1"

        rfield?: 'in' | 'out';
        rfieldindex?: number;   // "2"
        rfieldform?: string;    // refs from login form

        controltosubmitdata?: boolean;
        ids?: string;
        options?: string;
    }

    export enum FORMNAME {      // predefined form names
        noname = -1,
        signon = 0,
        pchange = 1,
        fieldcatalog = -2,
    }

    export interface FContext {
        type: 'pchange';
        name: number;           // "1"
    }

    export interface Detection {
        caption?: string;
        web_ourl?: string;
        web_murl?: string;
        web_qurl?: string;
        web_checkurl?: boolean; // "1"
        dlg_class?: string;
        names_ext?: string;
        processname?: string;
        commandline?: string;
    }

    export interface Options {
        choosename?: string;
        sidekick?: string;      // "manual mode hint"
        ownernote?: string;
        quicklink?: string;     // QL menu name
        auth_pl?: string;       // policy
        balooncount?: string;
        autoprompt?: string;    // boolean
        lockfields?: string;    // "0" | "1"
        submittype?: string;    // "dosubmit" | "nosubmit"
        iconkey?: string;       // Any name not necessarily unique
        iconlocation?: string;  // Format is the same as described into feedback_drawing.h. "Q:0:0:0"
        usequicklink?: string;  // ("1" | "usequicklink") | ("2" | "dontusequicklink")
        recheckwindowafterfillin?: string; // boolean
        qlwocred?: string;      // boolean. Quick reauthentication enable/disable (QL wo/ crededntials).
    }

    export interface Form {
        fcontext?: FContext;
        detection: Detection;
        options: Options;
        fields: Field[];
    }

    export interface Descriptor {
        id: string;             // "{fe94ea4f-ac76-4f7d-9c74-fa14abca889b}"
        created: string;        // "1d57495 61c6f733"
        modified: string;       // "1d57496 87bed3e8",
        integrity?: string;     // "OTS2.056a41167041b1ea2c529494aeb606d0e"
        version: string;        // "2.4.3"
    }

    export namespace Customization {
        export interface Process {
            name: string;       // process name like 'outlook.exe'
            type: string;       // 'skip'
        }
        export interface Options {
            processes: Process[];
        }
    }

    export interface Manifest {
        descriptor: Descriptor;
        options?: Customization.Options;
        forms: Form[];
    }

} //module Mani

