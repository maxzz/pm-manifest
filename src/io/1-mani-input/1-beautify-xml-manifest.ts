import { type Mani, FormIdx } from "../../all-types";
import { isFieldPsw } from "../4-meta-from-file";

/**
 * Convert XML object from .dpm file to our manifest format.
 */
export function beautifyXMLManifest(manifest: Mani.Manifest): Mani.Manifest {

    manifest.descriptor = (manifest.descriptor as any)?._attributes || {};
    manifest.forms = (manifest.forms as any)?.form || [];

    if (!Array.isArray(manifest.forms)) {
        manifest.forms = [manifest.forms];
    }

    manifest.forms.forEach(
        (form: Mani.Form, idx: number) => {
            // Remove _attributes
            form.fcontext && (form.fcontext = (form.fcontext as any)._attributes);
            form.detection && (form.detection = (form.detection as any)._attributes);
            form.options && (form.options = (form.options as any)._attributes);

            if (form.fields) {
                const fields = (form.fields as any).field as Mani.Field[];
                form.fields = Array.isArray(fields) ? fields : [fields];
            }

            // Perform typecast
            if (form.fcontext) {
                form.fcontext.name !== undefined && (form.fcontext.name = +form.fcontext.name);
            }

            if (form.detection) { // Url wrapping is done in the 2-urls-wrapping.ts
                form.detection.web_checkurl !== undefined && (form.detection.web_checkurl = !!form.detection.web_checkurl);
            }

            if (form.fields) {
                form.fields = form.fields.map(field => (field as any)._attributes);

                form.fields.forEach(
                    (field: Mani.Field) => {
                        field.password && (field.password = !!field.password);
                        field.submit && (field.submit = !!field.submit);
                        field.useit && (field.useit = !!field.useit);
                        field.rfieldindex && (field.rfieldindex = +field.rfieldindex);
                        field.rfieldform && (field.rfieldform = +field.rfieldform);
                        field.memOnly = { formIdx: idx, uuidThis: 0, uuidLoginFld: 0, dbnameInitial: field.dbname };
                    }
                );
            }
        }
    );

    if (manifest.options?.processes) {
        manifest.options.processes = (manifest.options.processes as any).process || [];
        if (!Array.isArray(manifest.options.processes)) {
            manifest.options.processes = [manifest.options.processes];
        }
        manifest.options.processes = manifest.options.processes.map((process) => (process as any)._attributes);
    }

    // 2. Additional compatibility steps
    restoreCpassLinkToLogin(manifest);

    return manifest;
}

function restoreCpassLinkToLogin(manifest: Mani.Manifest): void {
    const loginForm = manifest.forms[FormIdx.login];
    const cpassForm = manifest.forms[FormIdx.cpass];

    if (!loginForm?.fields || !cpassForm?.fields) { //TODO: fields can be undefined, see test-no-fields.dpm, but it should be empty array in this case
        return;
    }

    cpassForm.fields.forEach(
        (cpassField: Mani.Field) => {
            if (!isFieldPsw(cpassField)) { // Links are only for password fields
                return;
            }

            if (cpassField.rfield && !cpassField.rfieldindex) {
                cpassField.rfieldindex = 0; // special case of optimization not written 0 when file was saved
            }
        }
    );
}
