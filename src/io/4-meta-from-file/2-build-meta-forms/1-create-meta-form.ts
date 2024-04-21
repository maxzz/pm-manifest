import { Mani, Meta, fieldTyp4Str } from "../../../all-types";
import { getPool, TransformValue, FieldPath, urlDomain, removeQuery } from "../../../transforms";
import { getBailouts } from "../1-bailouts";
import { isManual, isIeServer, isIeProcess } from "./2-checks";
import { uuid } from "../../../utils";

export function createMetaForm(form: Mani.Form, idx: number): Meta.Form {
    const pool: string[] = getPool(form) || [];

    const fields: Meta.Field[] = (form.fields || []).map(
        (field: Mani.Field, idx: number) => ({
            mani: field,
            ftyp: fieldTyp4Str(field),
            life: TransformValue.valueLife4Mani(field),
            path: FieldPath.fieldPathItems(pool, field.path_ext || ''),
            pidx: idx,
            ridx: 0,
            uuid: uuid.asRelativeNumber(),
        })
    );

    const domain = urlDomain(removeQuery(form.detection?.web_ourl));
    const isScript = isManual(fields);
    const isIe = isIeServer(form) || isIeProcess(form);

    const newDisp: Meta.Disp = {
        domain,
        isScript,
        noFields: !fields.length,
        isIe,
    };

    const rv: Meta.Form = {
        mani: form,
        type: idx,
        disp: newDisp,
        pool: pool,
        view: FieldPath.loc.utils.buildPreviewData(fields),
        fields,
        rother: [],
        uuid: uuid.asRelativeNumber(),
    };

    rv.disp.bailOut = getBailouts(rv);

    return rv;
}
