import { type Field, type FieldPolicy } from "../../../all-types/1-mani";
import { type EditorField, fieldTyp4Str } from "../../../all-types";
import { TransformValue } from "../../3-transform-valuelife";

export function convFieldForEditor(maniField: Field): EditorField.ForAtoms {
    const { useit, displayname } = maniField;

    const valueLife = TransformValue.valueLife4Mani(maniField);
    !valueLife.value && (valueLife.value = "");     //TODO: cleanup all empty values to undefined when saving manifest
    !valueLife.isRef && (valueLife.isRef = false);  //TODO: cleanup all empty values to undefined when saving manifest

    const policies: FieldPolicy = {
        policy: maniField.policy || '',
        policy2: maniField.policy2 || '',
        options: maniField.options || '',
    };

    const rv: EditorField.ForAtoms = {
        useIt: !!useit,
        label: displayname || '',
        type: fieldTyp4Str(maniField),
        valueLife,
        dbname: maniField.dbname,
        policies,
        
        rfield: maniField.rfield || '',
        rfieldIndex: maniField.rfieldindex || 0,
        rfieldForm: maniField.rfieldform || 0,
    };
    return rv;
}
