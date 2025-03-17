import { Mani, Meta } from "../../../all-types";
import { createMetaForm } from "./1-create-meta-form";

export function buildManiMetaFormsOld(mani: Mani.Manifest | undefined): Meta.Form[] { //TODO: we should not input as mani, but just forms

    const metaForms: Meta.Form[] =
        !mani?.forms?.length
            ? []
            : mani.forms.map(createMetaForm);

    updateROtherArray(metaForms);

    return metaForms;
}

/**
 * Params are mani, but just forms. buildManiMetaForms() should be removed 
 * after dropzone, pmac, electron-window-monitor, and pmat24-lite are updated.
 */
export function buildManiMetaForms(maniForms: Mani.Form[] | undefined): Meta.Form[] {

    const metaForms: Meta.Form[] =
        !maniForms?.length
            ? []
            : maniForms.map(createMetaForm);

    updateROtherArray(metaForms);

    return metaForms;
}

function updateROtherArray(metaForms: Meta.Form[]): void {
    [0, 1].forEach(
        (formIdx: number) => {
            if (metaForms[formIdx]) {
                const otherIdx = formIdx === 0 ? 1 : 0;
                metaForms[formIdx].rother = metaForms[otherIdx]?.fields.map((field) => field.ridx) || [];
            }
        }
    );
}
