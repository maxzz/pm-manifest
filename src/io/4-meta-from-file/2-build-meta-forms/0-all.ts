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

    update_Links(metaForms);

    return metaForms;
}

/**
 * We create new password change meta form for existing login.
 * Login form is not modified except for cross-referencing.
 */
export function rebuildMetaFormsWithCpassForm(metaForms: Meta.Form[], maniForms: Mani.Form[], cpassManiForm: Mani.Form): Meta.Form[] {
    maniForms[FormIdx.cpass] = cpassManiForm;
    metaForms[FormIdx.cpass] = createMetaForm(cpassManiForm, FormIdx.cpass);

    update_Links(metaForms);

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

function update_Links(metaForms: Meta.Form[]): void {
    update_rotherRefs(metaForms);
    update_rfieldUuid(metaForms);
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

    update_rfieldUuid(metaForms);
}

function update_rfieldUuid(metaForms: Meta.Form[]): void {
    const loginForm = metaForms[FormIdx.login];
    const cpassForm = metaForms[FormIdx.cpass];

    if (!loginForm?.fields || !cpassForm?.fields) { //TODO: fields can be undefined, see test-no-fields.dpm, but it should be empty array in this case
        return;
    }

    cpassForm.fields.forEach(
        (cpassField: Meta.Field) => {
            const cpassToLoginIdx = cpassField.mani.rfieldindex;
            const refField = cpassToLoginIdx !== undefined ? loginForm.fields[cpassToLoginIdx] : undefined;

            if (!isFieldPsw(refField?.mani) || !isFieldPsw(cpassField.mani)) { // Links are only for password fields
                cpassField.mani.rfieldindex = undefined;
                cpassField.mani.rfield = undefined;
                cpassField.mani.memOnly.uuidLoginFld = 0;
                return;
            }

            const uuid = refField?.uuid || 0;

            cpassField.mani.rfieldindex = refField ? cpassToLoginIdx : undefined;
            cpassField.mani.memOnly.uuidLoginFld = uuid;
            cpassField.mani.rfield = // If we have link to login, then we use 'in' as rfield if it's not set
                uuid
                    ? cpassField.mani.rfield
                        ? cpassField.mani.rfield
                        : 'in'
                    : undefined;
        }
    );
}

export function isFieldPsw(field: Mani.Field | undefined): boolean {
    return field?.type === "edit" && !!field?.password;
}
