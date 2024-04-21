import { Mani } from "../../all-types";

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
        (form: Mani.Form) => {
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

            if (form.detection) {
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

    return manifest as Mani.Manifest;
}
