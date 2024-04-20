import { Mani, Meta, fieldTyp4Str } from '../../../all-types';
import { getPool, TransformValue, FieldPath, urlDomain, removeQuery } from '../../../transforms';
import { getBailouts } from '../1-bailouts';
import { uuid } from '../../../utils';

export function buildManiMetaForms(mani: Mani.Manifest | undefined): Meta.Form[] {
    const forms: Meta.Form[] = !mani || !mani.forms || !mani.forms.length
        ? []
        : mani.forms.map(createMetaForm);

    [0, 1].forEach((formIdx: number) => {
        if (forms[formIdx]) {
            forms[formIdx].rother = forms[formIdx === 0 ? 1 : 0]?.fields.map((field) => field.ridx) || [];
        }
    });

    return forms;
}

function isManual(fields: Meta.Field[]): boolean {
    return !!fields.length && fields.some(({ path }: { path: Meta.Path; }) => path.sn);
}

function isIeServer(form: Mani.Form): boolean {
    return !!form.detection?.names_ext?.match(/Internet Explorer_Server/);
}

function isIeProcess(form: Mani.Form): boolean {
    return !!form.detection?.processname?.match(/(iexplore|msedge|microsoftedgecp)\.exe"?$/i);
}

function createMetaForm(form: Mani.Form, idx: number): Meta.Form {
    const pool: string[] = getPool(form) || [];

    const fields: Meta.Field[] = (form.fields || []).map((field: Mani.Field, idx: number) => ({
        mani: field,
        ftyp: fieldTyp4Str(field),
        life: TransformValue.valueLife4Mani(field),
        path: FieldPath.fieldPathItems(pool, field.path_ext || ''),
        pidx: idx,
        ridx: 0,
        uuid: uuid.asRelativeNumber(),
    }));

    const domain = urlDomain(removeQuery(form.detection?.web_ourl));
    const isScript = isManual(fields);
    const isIe = isIeServer(form) || isIeProcess(form);

    const newMetaForm: Meta.Form = {
        mani: form,
        type: idx,
        disp: {
            domain,
            isScript,
            noFields: !fields.length,
            isIe,
        },
        pool: pool,
        view: FieldPath.loc.utils.buildPreviewData(fields),
        fields,
        rother: [],
        uuid: uuid.asRelativeNumber(),
    };

    const bailOuts = getBailouts(newMetaForm);
    if (bailOuts) {
        newMetaForm.disp.bailOut = bailOuts;
    }

    return newMetaForm;
}
