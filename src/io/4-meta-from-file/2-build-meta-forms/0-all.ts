import { Mani, Meta } from "../../../all-types";
import { createMetaForm } from "./1-create-meta-form";

export function buildManiMetaForms(mani: Mani.Manifest | undefined): Meta.Form[] {

    const metaForms: Meta.Form[] =
        !mani?.forms?.length
            ? []
            : mani.forms.map(createMetaForm);

    [0, 1].forEach(
        (formIdx: number) => {
            if (metaForms[formIdx]) {
                const otherIdx = formIdx === 0 ? 1 : 0;
                metaForms[formIdx].rother = metaForms[otherIdx]?.fields.map((field) => field.ridx) || [];
            }
        }
    );

    return metaForms;
}
