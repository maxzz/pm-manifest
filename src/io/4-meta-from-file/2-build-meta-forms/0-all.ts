import { type Mani, type Meta, FormIdx } from "../../../all-types";
import { createMetaForm } from "./1-create-meta-form";

/**
 * This is used by dropzone, pmac, electron-window-monitor, and pmat24-lite are updated.
 */
export function buildManiMetaForms(maniForms: Mani.Form[] | undefined): Meta.Form[] {

    const metaForms: Meta.Form[] =
        !maniForms?.length
            ? []
            : maniForms.map(createMetaForm);

    update_rotherRefs(metaForms);

    return metaForms;
}

/**
 * We create new password change meta form for existing login.
 * Login form is not modified except for cross-referencing.
 */
export function rebuildMetaFormsWithCpassForm(metaForms: Meta.Form[], maniForms: Mani.Form[], cpassManiForm: Mani.Form): Meta.Form[] {
    maniForms[FormIdx.cpass] = cpassManiForm;
    metaForms[FormIdx.cpass] = createMetaForm(cpassManiForm, FormIdx.cpass);

    update_rotherRefs(metaForms);

    return metaForms;
}

/**
 * We create new password change meta form for existing login.
 * Login form is not modified except for cross-referencing.
 */
export function rebuildMetaFormsWithoutCpassForm(metaForms: Meta.Form[], maniForms: Mani.Form[]) {
    if (metaForms.length !== 2 || maniForms.length !== 2) {
        throw new Error("Invalid #of forms");
    }

    maniForms.pop();
    metaForms.pop();

    update_rotherRefs(metaForms);
}

function update_rotherRefs(metaForms: Meta.Form[]): void {
    [0, 1].forEach(
        (idx: number) => {
            if (metaForms[idx]) {
                const otherIdx = idx === 0 ? 1 : 0;
                metaForms[idx].previewOther = metaForms[otherIdx]?.fields.map(
                    (field: Meta.Field) => field.previewIdx
                ) || [];
            }
        }
    );
}

/*
function linkCpassFormToLogin(metaForms: Meta.Form[]) {
    const loginForm = metaForms[FormIdx.login];
    const cpassForm = metaForms[FormIdx.cpass];

    if (!loginForm || !cpassForm) {
        return;
    }

    cpassForm.fields.forEach(
        (cpassField: Meta.Field) => {
            if (cpassField.mani.rfieldindex !== -1 && cpassField.mani.rfieldindex) {
                const loginField = loginForm.fields[cpassField.mani.rfieldindex];
                cpassField. = loginForm.uuid;
            }
        }
    );
}

function findFieldByIdx(loginForm: Meta.Form, idx: number): Meta.Field | undefined {
    return loginForm.fields.find(
        (field: Meta.Field) => field.previewIdx === idx
    );
}
*/

// function linkCpassFormToLogin(manifest: Mani.Manifest): void {
//     const loginForm = manifest.forms[FormIdx.login];
//     const cpassForm = manifest.forms[FormIdx.cpass];

//     if (!loginForm || !cpassForm) {
//         return;
//     }

//     cpassForm.fields.forEach(
//         (field: Mani.Field) => {
//             field.rfieldform = loginForm.uuid;
//         }
//     );
// }
