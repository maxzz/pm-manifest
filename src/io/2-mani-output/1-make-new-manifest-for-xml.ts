import { type CatalogFile, type CatalogItem, type FieldCatalog, type Mani } from "../../all-types";
import { fcItemInFileFromFieldValue } from "../4-meta-from-file";

const ATTRS: string = "_attributes";

function hasKeys(obj?: object): boolean {
    return !!obj && !!Reflect.ownKeys(obj).length;
}

export function prepareNewMani4Xml(mani: Mani.Manifest): Mani.Manifest {
    const { options, descriptor, forms, ...rest } = mani;

    const rv: any = { manifest: {}, };

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
            form: forms.map(
                (form: Mani.Form) => {
                    const { fcontext, detection, options, fields, ...rest } = form;
                    const xmlFields = fields?.map((field) => ({ [ATTRS]: field }));
                    return {
                        ...(hasKeys(fcontext) && { fcontext: { [ATTRS]: form.fcontext } }),
                        ...(hasKeys(detection) && { detection: { [ATTRS]: form.detection } }),
                        ...(hasKeys(options) && { options: { [ATTRS]: form.options } }),
                        ...(fields?.length && { fields: { field: xmlFields } }),
                        ...rest,
                    };
                }
            )
        };
    }

    return { ...rv, ...rest, };
}

export function prepareNewFc4Xml(fc: FieldCatalog): CatalogFile.Root {
    const { descriptor, items, ...rest } = fc;
    const rv: any = {};

    // 1. Descriptor
    if (hasKeys(descriptor)) {
        rv.descriptor = { [ATTRS]: descriptor };
    }

    // 2. Names
    if (items?.length) {
        rv.names = {
            name: items.map(
                (item: CatalogItem) => {
                    const name = fcItemInFileFromFieldValue(item);
                    return { [ATTRS]: name };
                }
            )
        };
    }

    return { ...rv, ...rest, };
}
