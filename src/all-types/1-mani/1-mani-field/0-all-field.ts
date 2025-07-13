// Field types

export type FieldTypeStr = 'edit' | 'button' | 'list' | 'combo' | 'check' | 'radio' | 'text' | 'listbx';

// Field Ids and Value

export type FieldValueIds = {
    displayname: string,            // It should be '' (in momory) if undefined and empty won't be stored in file (for localization). In filed catalog this is "dispname" and is required so we mark it here as required as well.
    dbname: string;
    ownernote?: string;             // This is not stored in Field and may appear in Field Catalog only.
};

export type FieldValueValue = {
    value?: string;
    choosevalue?: string;           // This does not exist in field catalog yet but we can added it to field catalog (as 2023 extension).
    password?: boolean,             // In file it's undefined | '1'. Only field catalog or manual mode can change this value.
    askalways?: boolean,            // In file it's undefined | '1'.
    onetvalue?: boolean,            // In file it's undefined | '1'.
};

export type FieldValue = Prettify<FieldValueIds & FieldValueValue>;

// Field Policy

export type FieldPolicySome = {
    policy?: string | undefined;    // This is standard rule: "[p4]g:8:8:withspecial:different_ap"
    policy2?: string | undefined;   // This is custom rule like: "[e1]g:(a{4,4}d{2,2}A{1,1}[@#$%!]{1,1})&lt;8,8&gt;"; both can present at the same time. It's defined in file, but not in c++.
    options?: string | undefined;   // See FieldPolicyOptions type
};

export type FieldPolicy = Prettify<Required<FieldPolicySome>>;

export type FieldPolicyOptions = {  // Names are case-sensitive here as it comes from file.
    chgpolopts: {                   // Field options (e.g. password change field policy options stringify'd JSON object). "norep" and "chkppos"
        norep: boolean;             // TODO: Who puts FieldPolicyOptions into manifest?
        chkppos: boolean;           //       These options are part of policy2, not field itself. This should not exist in manifest, but...
    };
};

// Field and value cross-references

export type FieldLinks = {          // rfieldindex and rfield come together and defined only on cpass form
    rfield?: 'in' | 'out';          // 'in'(old psw) - from login form field value, 'out'(new psw) - to login form field value
    rfieldindex?: number;           // Index to password field in login from cpass, like '2' when in file, but uuid.asRelativeNumber() when loaded in memory for editing
    rfieldform?: number;            // (see enum FORMNAME) '-2' if field is comming from catalog; Defined mostly on login form (or on cpass if it's a new password field not from login form).
};

export type MemOnly = {             // This section is not saved in manifest, but exists on Field and EditorField atoms
    memOnly: {
        uuidThis: number;           // This field uuid; initialized when meta field is created
        uuidLoginFld: number;       // Index to password field in login from cpass; used to link forms before saving
        dbnameInitial: string;      // Initial value of the dbid if field was not linked to login form otherwise empty
    };
};

// All together

export type Field = Prettify<
    & {
        type: FieldTypeStr;         // This does not exist in field catalog
    }
    & FieldValue
    & {
        path?: string;              // This is old path, so just preserve it if it exists
        path_ext?: string;          // Path to this control with accessiblity info if exists

        useit?: boolean,            // "1"
        submit?: boolean,           // "1"
        controltosubmitdata?: boolean;
        ids?: string;
    }
    & FieldPolicySome
    & FieldLinks
    & MemOnly
>;
