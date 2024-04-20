import { Meta } from '../../../all-types';

//export namespace Bailouts {

function noSIDs(meta: Meta.Form) {
    return !!meta.disp.domain && !meta.disp.isScript &&
        !!meta.fields.find((field: Meta.Field) => field.mani.useit && !field.path.sid && field.mani.type !== 'button');
}

export function getBailouts(meta: Meta.Form): string[] | undefined {
    const rv: string[] = [];
    
    if (meta.disp.isIe && !meta.disp.domain) {
        rv.push("IE website form without site domain");
    }

    if (meta.disp.isIe && meta.disp.isScript) {
        rv.push("Manual mode manifest built for IE");
    }

    if (noSIDs(meta)) {
        rv.push("There are fields in the form without an ID. Check path that does not have SID."); // short: The form has fields with no ID
    }

    return rv.length ? rv : undefined;
}

//} //namespace Bailouts

// TODO: bailOut: add more checks and explanation why there are issues on each check.
