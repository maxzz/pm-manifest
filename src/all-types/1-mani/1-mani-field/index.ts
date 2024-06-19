// Field types

export type FieldTypeStr = 'edit' | 'button' | 'list' | 'combo' | 'check' | 'radio' | 'text' | 'listbx';

export type FieldValueValue = {
    value?: string;
    choosevalue?: string;           // This does not exist in field catalog yet but we can added it to field catalog (as 2023 extension).
    password?: boolean,             // In file it's undefined | '1'. Only field catalog or manual mode can change this value.
    askalways?: boolean,            // In file it's undefined | '1'.
    onetvalue?: boolean,            // In file it's undefined | '1'.
};

export type FieldValueIds = {
    displayname: string,            // It should be '' (in momory) if undefined and empty won't be stored in file (for localization). In filed catalog this is "dispname" and is required so we mark it here as required as well.
    dbname: string;
    ownernote?: string;             // This is not stored in Field and may appear in Field Catalog only.
};

export type FieldValue = FieldValueValue & FieldValueIds;

export type FieldPolicySome = {
    policy?: string | undefined;    // This is standard rule: "[p4]g:8:8:withspecial:different_ap"
    policy2?: string | undefined;   // This is custom rule like: "[e1]g:(a{4,4}d{2,2}A{1,1}[@#$%!]{1,1})&lt;8,8&gt;"; both can present at the same time. It's defined in file, but not in c++.
    options?: string | undefined;   // see FieldPolicyOptions type
};

export type FieldPolicy = Prettify<Required<FieldPolicySome>>;

export type FieldPolicyOptions = {  // Names are case-sensitive here as it comes from file.
    chgpolopts: {                   // Field options (e.g. password change field policy options stringify'd JSON object). "norep" and "chkppos"
        norep: boolean;             // TODO: Who puts FieldPolicyOptions into manifest?
        chkppos: boolean;           //       These options are part of policy2, not field itself. This should not exist in manifest, but...
    };
};

export type FieldDirection = {
    rfield?: 'in' | 'out';
    rfieldindex?: number;           // "2"
    rfieldform?: string;            // refs from login form
};

export type Field = FieldValue & FieldPolicySome & FieldDirection & {
    type: FieldTypeStr;             // This does not exist in field catalog

    path_ext?: string;              // path to this control with accessiblity info if exists

    submit?: boolean,               // "1"
    useit?: boolean,                // "1"

    controltosubmitdata?: boolean;
    ids?: string;
};
