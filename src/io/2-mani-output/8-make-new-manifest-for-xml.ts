import { type CatalogFile, type Mani } from "../../all-types";

const ATTRS: string = "_attributes";

function hasKeys(obj?: object): boolean {
    return !!obj && !!Reflect.ownKeys(obj).length;
}

export function prepareNewMani4Xml(mani: Mani.Manifest): Mani.Manifest {
    const { options, descriptor, forms } = mani;

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

    // 2.1 Remve memOnly from fields before saving
    // forms?.forEach(
    //     (form: Mani.Form) => {
    //         form.fields?.forEach(
    //             (field: Partial<Mani.Field>) => {
    //                 delete field.memOnly;
    //             }
    //         );
    //     }
    // );
    //No good to modify input params

    // 3. Manifest forms
    if (forms?.length) {
        rv.manifest.forms = {
            form: forms.map(
                (form: Mani.Form) => {
                    const { fcontext, detection, options, fields, ...rest } = form;
                    const xmlFields =
                        fields?.map(
                            (field: Partial<Mani.Field>) => { const { memOnly, ...rest } = field; return { ...rest }; }
                        ).map(
                            (field) => ({ [ATTRS]: field })
                        );
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

    return rv;
}

export function prepareNewFc4Xml(fc: CatalogFile.Root): CatalogFile.Root {
    const { descriptor, names } = fc;
    const rv: any = { storagecatalog: {} }; // empty to preserve fields order

    // 1. Customization
    if (hasKeys(descriptor)) {
        rv.storagecatalog.descriptor = { [ATTRS]: descriptor };
    }

    // 2. Names
    if (names?.length) {
        rv.storagecatalog.names = {
            name: names.map(
                (name: CatalogFile.ItemInFile) => {
                    return { [ATTRS]: name };
                }
            )
        };
    }

    return rv;
}
