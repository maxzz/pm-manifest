import { parseOptionsRead } from "./mani-i";
import { showError } from "./mani-show-error";
import { TransformEncoding } from "../transforms";
import { J2xParser } from "../utils/json2xml";
export const parseOptionsWrite = {
    ...parseOptionsRead,
    format: true,
    indentBy: '\t',
    attrValueProcessor: (attrValue, attrName) => {
        const val = typeof attrValue === 'string'
            ? TransformEncoding.xmlEscape(attrValue)
            : typeof attrValue === 'boolean'
                ? attrValue ? '1' : '0'
                : attrValue; //console.log(`    ${attrName} = ${val}`);
        return val;
    }
};
const ATTRS = "_attributes";
function hasKeys(obj) {
    return !!obj && !!Reflect.ownKeys(obj).length;
}
function makeNewManifest4Xml(mani) {
    const { options, descriptor, forms, ...rest } = mani;
    let rv = { manifest: {}, };
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
export function makeXML(mani) {
    let rv = mani && makeNewManifest4Xml(mani);
    if (rv) {
        try {
            const j2xParser = new J2xParser(parseOptionsWrite);
            const xml = j2xParser.parse(rv);
            return `<?xml version="1.0" encoding="UTF-8"?>\n${xml}`;
        }
        catch (error) {
            showError(error);
        }
    }
}
//TODO: attrValueProcessor(): convert value life and skip '=== undefined'
