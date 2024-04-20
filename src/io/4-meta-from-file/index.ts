import { CatalogFile, CatalogItem, FieldCatalog, Mani, Meta, fieldTyp4Str } from '../../all-types';
import { getPool, TransformValue, FieldPath, urlDomain, removeQuery } from '../../transforms';
import { uuid } from '../../utils';

namespace Bailouts {

    function noSIDs(meta: Meta.Form) { // web, not script, use it, no sid, and not button; scuonlinebanking.com clogin #89340
        return !!meta.disp.domain && !meta.disp.isScript &&
            !!meta.fields.find((field: Meta.Field) => field.mani.useit && !field.path.sid && field.mani.type !== 'button');
    }

    export function getBailouts(meta: Meta.Form): string[] | undefined {
        const rv: string[] = [];
        if (meta.disp.isIe && !meta.disp.domain) {
            rv.push("IE website form without site domain");
        }
        if (meta.disp.isIe && meta.disp.isScript) {
            rv.push("Manual mode manifest built for IE");
        };
        if (noSIDs(meta)) {
            rv.push("There are fields in the form without an ID. Check path that does not have SID."); // short: The form has fields with no ID
        }
        return rv.length ? rv : undefined;
    }

} //namespace Bailouts

export function buildManiMetaForms(mani: Mani.Manifest | undefined): Meta.Form[] {
    const forms: Meta.Form[] = !mani || !mani.forms || !mani.forms.length
        ? []
        : mani.forms.map(createMetaForm);

    [0, 1].forEach((formIdx: number) => { // build forms xlinks
        if (forms[formIdx]) {
            forms[formIdx].rother = forms[formIdx === 0 ? 1 : 0]?.fields.map((field) => field.ridx) || [];
        }
    });

    return forms;

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

        const bailOuts = Bailouts.getBailouts(newMetaForm);
        if (bailOuts) {
            newMetaForm.disp.bailOut = bailOuts;
        }

        return newMetaForm;
    } //createMetaForm()

} //buildManiMetaForms()

// Field catalog transformation

export function catalogItemInFileToFieldValue(catalogName: CatalogFile.ItemInFile): Mani.FieldValue {
    const { dispname, ...rest } = catalogName;
    return {
        displayname: dispname,
        ...rest,
    };
}

export function fieldValueToCatalogItemInFile(fieldValue: Mani.FieldValue): CatalogFile.ItemInFile {
    const { displayname, ...rest } = fieldValue;
    return {
        dispname: displayname,
        ...rest,
    };
}

export function buildCatalogMetaFromNames(catalogNames: CatalogFile.ItemInFile[] | undefined): FieldCatalog {
    const items = catalogNames?.map(addInMemInfo) || [];
    return {
        items,
    };

    function addInMemInfo(catalogName: CatalogFile.ItemInFile, idx: number): CatalogItem {
        const now = uuid.asRelativeNumber();
        return {
            ...catalogItemInFileToFieldValue(catalogName),
            index: idx,
            uuid: now,
            mru: now,
        };
    }
}

export function buildCatalogMeta(fcat: CatalogFile.Root | undefined): FieldCatalog {
    //TODO: handle addtional info
    return buildCatalogMetaFromNames(fcat?.names);
}

// TODO: bailOut: add more checks and explanation why there are issues on each check.
