import { type Field, type FieldPolicy } from "../1-mani/1-mani-field";
import { type ValueLife } from "../1-mani/1-mani-field/2-value-life";
import { type FieldTyp } from "../1-mani/1-mani-field/1-field-typ";

export namespace EditorField {

    export type ForAtoms = {
        useIt: boolean;
        label: string;
        type: FieldTyp;
        valueLife: ValueLife;           // This includes value and valueAs
        dbname: string;                 // Field guid from manifest or field catalog
        policies: FieldPolicy;          // Policy, policy2, options

        rfield: string;                 // 'in' | 'out': in(old psw) - from login form field value, out(new psw) - to login form field value
        rfieldIndex: number;            // Index to password field in login from cpass, like '2'
        rfieldForm: number;             // '-2' if field is comming from catalog; Defined mostly on login form (or on cpass if it's a new password field not from login form).
    };

    /**
     * Members ot the Field type that are used in the normal/manual field editors.
     * 
     * Other members are not used in the editor
     *  | 'path'                         // string
     *  | 'path_ext'                     // string
     *  | 'submit'                       // boolean
     *  
     *  | 'controltosubmitdata'          // boolean
     *  | 'ids'                          // string
     *  
     *  | 'rfield'                       // 'in' | 'out'
     *  | 'rfieldindex'                  // number // '2' - field catalog
     *  | 'rfieldform'                   // string // refs from login form
     *  
     *  | 'choosevalue'                  // string
     *  
     *  | chgpolopts                     // FieldPolicyOptions. it should not be used anymore
     *  |
     *  | ownernote                      // string
     */
    export type Members = Pick<Field,
        | 'useit'
        | 'displayname'
        | 'type'
        | 'dbname'
        | 'value'                       // | 'choosevalue' - so far cannot be changed
        | 'password'
        | 'askalways'
        | 'onetvalue'
        | 'policy'
        | 'policy2'
        | 'rfield'
        | 'rfieldindex'
        | 'rfieldform'
        | 'options'
    >;
}
