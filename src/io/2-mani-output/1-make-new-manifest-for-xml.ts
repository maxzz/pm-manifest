import { Mani } from "../../all-types";

const ATTRS: string = "_attributes";
function hasKeys(obj?: object): boolean {
    return !!obj && !!Reflect.ownKeys(obj).length;
}

export function makeNewManifest4Xml(mani: Mani.Manifest): Mani.Manifest {
    const { options, descriptor, forms, ...rest } = mani;

    let rv: any = { manifest: {}, };

    // 1. Customization
    if (options) {
        const { processes, ...rest } = options;
        const xmlProcesses = processes?.length && { processes: { process: processes.map((process) => ({ [ATTRS]: process })) } };
        rv.manifest.options = { ...xmlProcesses, ...rest, };
    }

    // 2. Manifest descriptor
    if (hasKeys(descriptor)) {
        rv.manifest.descriptor = { [ATTRS]: descriptor };
    }

    // 3. Manifest forms
    if (forms?.length) {
        rv.manifest.forms = {
            form: forms.map((form) => {
                const { fcontext, detection, options, fields, ...rest } = form;
                return {
                    ...(hasKeys(fcontext) && { fcontext: { [ATTRS]: form.fcontext } }),
                    ...(hasKeys(detection) && { detection: { [ATTRS]: form.detection } }),
                    ...(hasKeys(options) && { options: { [ATTRS]: form.options } }),
                    ...(fields?.length && { fields: { field: form.fields.map((field) => ({ [ATTRS]: field })) } }),
                    ...rest,
                };
            })
        };
    }

    return { ...rv, ...rest, };
}
