import { Mani } from "./mani";

/**
 * Our internal enum mapped from
 * Mani.FieldTypeStr = 'edit' | 'button' | 'list' | 'combo' | 'check' | 'radio' | 'text' | 'listbx';
 */
export enum FieldTyp {
    und, // undefined
    edit,
    button,
    list,
    combo,
    check,
    radio,
    text,
    listbx, // this is not used anywhere but returend by accengine. found with old dpferret 07.09.23

    psw,    // combined value 'edit' and 'password'
}

/**
 * Convert manifest field type to our internal type
 * @param field manifest field where type is string
 * @returns our internal type FieldTyp
 */
export function fieldTyp4Str(field: Pick<Mani.Field, 'type' | 'password'>): FieldTyp {
    const rv = FieldTyp[field.type] || FieldTyp.und;
    return (
        rv === FieldTyp.edit && field.password
            ? FieldTyp.psw
            : rv
    );
}

export function fieldTyp2Obj(typ: FieldTyp): { password?: boolean | undefined; type: Mani.FieldTypeStr; } {
    const isPsw = typ === FieldTyp.psw;
    const type = (
        isPsw
            ? FieldTyp[FieldTyp.edit]
            : FieldTyp[typ]
    ) as Mani.FieldTypeStr;
    return {
        type,
        ...(isPsw && { 'password': true }),
    };
}

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
