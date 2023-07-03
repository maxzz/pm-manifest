import { fieldTyp4Str } from '../mani-types';
import { getPool } from '../transforms/transform-mani-pool';
import { TransformValue } from '../transforms/transform-valuelife';
import { FieldPath } from '../transforms/transform-path';
import { removeQuery, urlDomain } from '../transforms/url';
import { uuid } from '../utils';
var Bailouts;
(function (Bailouts) {
    function noSIDs(meta) {
        return !!meta.disp.domain && !meta.disp.isScript &&
            !!meta.fields.find((field) => field.mani.useit && !field.path.sid && field.mani.type !== 'button');
    }
    function getBailouts(meta) {
        const rv = [];
        if (meta.disp.isIe && !meta.disp.domain) {
            rv.push("IE website form without site domain");
        }
        if (meta.disp.isIe && meta.disp.isScript) {
            rv.push("Manual mode manifest built for IE");
        }
        ;
        if (noSIDs(meta)) {
            rv.push("There are fields in the form without an ID. Check path that does not have SID."); // short: The form has fields with no ID
        }
        return rv.length ? rv : undefined;
    }
    Bailouts.getBailouts = getBailouts;
})(Bailouts || (Bailouts = {})); //namespace Bailouts
export function buildManiMetaForms(mani) {
    const isManual = (fields) => {
        return !!fields.length && fields.some(({ path }) => path.sn);
    };
    const isIeServer = (form) => {
        return !!form.detection?.names_ext?.match(/Internet Explorer_Server/);
    };
    const isIeProcess = (form) => {
        return !!form.detection?.processname?.match(/(iexplore|msedge|microsoftedgecp)\.exe"?$/i);
    };
    const createMetaForm = (form, idx) => {
        const pool = getPool(form) || [];
        const fields = (form.fields || []).map((field, idx) => ({
            mani: field,
            ftyp: fieldTyp4Str(field),
            life: TransformValue.valueLife4Mani(field),
            path: FieldPath.fieldPathItems(pool, field.path_ext || ''),
            pidx: idx,
            ridx: 0,
        }));
        const domain = urlDomain(removeQuery(form.detection?.web_ourl));
        const isScript = isManual(fields);
        const isIe = isIeServer(form) || isIeProcess(form);
        const meta = {
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
        };
        const bailOuts = Bailouts.getBailouts(meta);
        if (bailOuts) {
            meta.disp.bailOut = bailOuts;
        }
        return meta;
    };
    const forms = !mani || !mani.forms || !mani.forms.length ? [] : mani.forms.map(createMetaForm);
    [0, 1].forEach((type) => {
        if (forms[type]) {
            forms[type].rother = forms[type === 0 ? 1 : 0]?.fields.map((field) => field.ridx) || [];
        }
    });
    return forms;
}
// Field catalog transformation
export function buildCatalogMetaFromNames(names) {
    const items = names?.map((item, idx) => {
        const now = uuid.asRelativeNumber();
        return { ...item, index: idx, uuid: now, mru: now, };
    }) || [];
    return {
        items,
    };
}
export function buildCatalogMeta(fcat) {
    //TODO: handle addtional info
    return buildCatalogMetaFromNames(fcat?.names);
}
// TODO: bailOut: add more checks and explanation why there are issues on each check.
