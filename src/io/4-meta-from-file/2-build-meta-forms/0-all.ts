import { Mani, Meta } from "../../../all-types";
import { createMetaForm } from "./1-create-meta-form";

/**
 * This is used by dropzone, pmac, electron-window-monitor, and pmat24-lite are updated.
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
