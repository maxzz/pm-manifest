export var Mani;
(function (Mani) {
    let FORMNAME;
    (function (FORMNAME) {
        FORMNAME[FORMNAME["noname"] = -1] = "noname";
        FORMNAME[FORMNAME["signon"] = 0] = "signon";
        FORMNAME[FORMNAME["pchange"] = 1] = "pchange";
        FORMNAME[FORMNAME["fieldcatalog"] = -2] = "fieldcatalog";
    })(FORMNAME = Mani.FORMNAME || (Mani.FORMNAME = {}));
})(Mani || (Mani = {})); //module Mani
export const LIST_valueAskNames = ["Ask - Resuse", "Ask - Confirm", "Ask Always ",];
export const LIST_references = {
    txt: {
        name: /**/ { i: 0, f: "Windows User Name", /**/ s: "User Name" },
        upnname: /**/ { i: 1, f: "Windows User Principal Name", /**/ s: "User Principal Name" },
        fullname: /**/ { i: 2, f: "Windows Domain\\User Name", /**/ s: "Domain\\User Name" },
        domain: /**/ { i: 3, f: "Windows Domain", /**/ s: "Windows Domain" },
        "e-mail": /**/ { i: 4, f: "Windows E-mail Address", /**/ s: "Windows Email" },
    },
    psw: {
        password: { i: 0, f: "Windows User Password", s: "Windows Password" },
    },
};
/*
    const enum FieldType {       // This is internal type used by Bkg and Cs, but these definitions are close to DPAgent definitions.
        uni = 0,                 // Uninitialized
        txt = 1,                 // Field is unprotected input control.
        psw = 2,                 // Field is password.
        btn = 3,                 // Field is button (possibly to submit).
        chk = 4,                 // Field is checkbox field.
        // The rest is for compatibility to match manifest definitions.
        rad = 5,                 // Field is radiobox
        lst = 6,                 // Field is list as select field.
        cmb = 7,                 // drop down field aka combobox, in many cases it will be a regular edit controll. For manifest::FIELDTYPE::combo
        lab = 8,                 // text for match. The item for corresponding to manifest::FIELDTYPE::text.
        irr = 9,                 // The field type is irrelevant for us, but used (only internally) as a position placeholder in CS form.
    }
*/
/**
 * Our UI internal type
 */
export var FieldTyp;
(function (FieldTyp) {
    FieldTyp[FieldTyp["und"] = 0] = "und";
    FieldTyp[FieldTyp["edit"] = 1] = "edit";
    FieldTyp[FieldTyp["button"] = 2] = "button";
    FieldTyp[FieldTyp["list"] = 3] = "list";
    FieldTyp[FieldTyp["combo"] = 4] = "combo";
    FieldTyp[FieldTyp["check"] = 5] = "check";
    FieldTyp[FieldTyp["radio"] = 6] = "radio";
    FieldTyp[FieldTyp["text"] = 7] = "text";
    FieldTyp[FieldTyp["psw"] = 8] = "psw";
})(FieldTyp || (FieldTyp = {}));
export function fieldTyp4Str(field) {
    let rv = FieldTyp[field.type] || FieldTyp.und;
    return rv === FieldTyp.edit && field.password ? FieldTyp.psw : rv;
}
