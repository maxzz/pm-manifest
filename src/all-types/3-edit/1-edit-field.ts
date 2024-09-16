import { type Field, type FieldPolicy } from "../1-mani/1-mani-field";
import { type ValueLife } from "../1-mani/1-mani-field/2-value-life";
import { type FieldTyp } from "../1-mani/1-mani-field/1-field-typ";

export namespace EditorField {

    export type ForAtoms = {
        useIt: boolean;
        label: string;
        type: FieldTyp;
        valueLife: ValueLife;           // this includes value and valueAs
        dbname: string;                 // field guid from manifest or field catalog
        policies: FieldPolicy;          // policy, policy2, options
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
        | 'options'
    >;
}
