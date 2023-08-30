import { CatalogFile, Mani } from '../all-types';
import { XMLParser } from 'fast-xml-parser';

export function beautifyXMLManifest(manifest: Mani.Manifest): Mani.Manifest {
    // 0. convert XML .dpm object to manifest format.

    manifest.descriptor = (manifest.descriptor as any)?._attributes || {};
    manifest.forms = (manifest.forms as any)?.form || [];

    if (!Array.isArray(manifest.forms)) {
        manifest.forms = [manifest.forms];
    }

    manifest.forms.forEach((form: Mani.Form) => {
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

            form.fields.forEach((field: Mani.Field) => {
                field.password && (field.password = !!field.password);
                field.submit && (field.submit = !!field.submit);
                field.useit && (field.useit = !!field.useit);
                field.rfieldindex && (field.rfieldindex = +field.rfieldindex);
            });
        }
    });

    if (manifest.options?.processes) {
        manifest.options.processes = (manifest.options.processes as any).process || [];
        if (!Array.isArray(manifest.options.processes)) {
            manifest.options.processes = [manifest.options.processes];
        }
        manifest.options.processes = manifest.options.processes.map((process) => (process as any)._attributes);
    }

    return manifest as Mani.Manifest;
}

export function beautifyXMLCatalog(catalog: CatalogFile.Root): CatalogFile.Root {
    catalog.names = (catalog as any)?.names?.name || [];
    catalog.names = catalog.names.map((item: any) => item?._attributes).filter(Boolean);
    return catalog;
}

export const parseOptionsRead = {
    attributeNamePrefix: "",
    attributesGroupName: "_attributes",
    ignoreAttributes: false,
    allowBooleanAttributes: true,
};

export type ParseManifestResult = {
    mani?: Mani.Manifest;
    fcat?: CatalogFile.Root;
};

export function parseXMLFile(cnt: string): ParseManifestResult {
    const parser = new XMLParser(parseOptionsRead);
    const obj = parser.parse(cnt); //console.log('%craw', 'color: green', JSON.stringify(obj, null, 4));
    return {
        mani: obj?.manifest && beautifyXMLManifest(obj.manifest),
        fcat: obj?.storagecatalog && beautifyXMLCatalog(obj?.storagecatalog),
    };
}

//TODO: make sure that we convert '1' to true and '0' to false.
