import { type Mani, type Meta, fieldTyp4Str } from "../../../all-types";
import { getPool, TransformValue, FieldPath, urlDomain, removeQuery } from "../../../transforms";
import { isAnyFieldManual, isIeProcess, isIeServer, uuid } from "../../../utils";
import { getBailouts } from "../1-bailouts";

export function createMetaForm(form: Mani.Form, formIdx: number): Meta.Form {
    const pool: string[] = getPool(form) || [];

    const fields: Meta.Field[] = (form.fields || []).map(
        (field: Mani.Field, idx: number) => {
            const newField: Meta.Field = {
                mani: field,
                ftyp: fieldTyp4Str(field),
                life: TransformValue.valueLife4Mani(field),
                path: FieldPath.fieldPathItems(pool, field.path_ext || ''),
                pidx: idx,
                previewIdx: 0,
                uuid: uuid.asRelativeNumber(),
            };
            field.memOnly.uuidThis = newField.uuid;
            return newField;
        }
    );

    const newDisp: Meta.Disp = {
        domain: urlDomain(removeQuery(form.detection?.web_ourl)),
        isScript: isAnyFieldManual(fields),
        noFields: !fields.length,
        isIe: isIeServer(form) || isIeProcess(form),
    };

    const rv: Meta.Form = {
        mani: form,
        type: formIdx,
        disp: newDisp,
        pool,
        view: FieldPath.loc.utils.buildPreviewData(fields),
        fields,
        previewOther: [],
        uuid: uuid.asRelativeNumber(),
    };

    rv.disp.bailOut = getBailouts(rv);

    return rv;
}
