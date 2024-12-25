import { type Mani, type Meta } from "../all-types";

// Utilities at form level

export const isFormManual = (form: Meta.Form | undefined): boolean => !!form?.disp.isScript;
export const isFormEmpty = (form: Meta.Form | undefined): boolean => !!form?.disp.noFields;
export const isFormWeb = (form: Meta.Form | undefined): boolean => !!form?.disp.domain;
export const isFormIe6 = (form: Meta.Form | undefined): boolean => !!form?.disp.isIe;
export const isFormWhy = (form: Meta.Form | undefined): boolean => !!form?.disp.bailOut;

// Utilities at meta and manifest level

export const isAnyManual = (meta: Meta.Form[] | undefined): boolean => !!meta?.some(isFormManual);
export const isAnyEmpty = (meta: Meta.Form[] | undefined): boolean => !meta?.length || !!meta?.some((form: Meta.Form) => form.disp.noFields);
export const isAnyWeb = (meta: Meta.Form[] | undefined): boolean => !!meta?.[0]?.disp.domain || !!meta?.[1]?.disp.domain;
export const isAnyIe6 = (meta: Meta.Form[] | undefined): boolean => !!meta?.[0]?.disp.isIe || !!meta?.[1]?.disp.isIe;
export const isAnyWhy = (meta: Meta.Form[] | undefined): boolean => !!meta?.[0]?.disp.bailOut || !!meta?.[1]?.disp.bailOut;

export function isAnyMatchedCap(mani: Mani.Manifest | undefined, regex: RegExp | undefined): boolean { // is any matched caption
    const forms = mani?.forms;
    const form0 = forms?.[0]?.detection?.caption;
    const form1 = forms?.[1]?.detection?.caption;
    return regex ? !!form0?.match(regex) || !!form1?.match(regex) : !!form0 || !!form1;
}

export function isAnyMatchedCls(mani: Mani.Manifest | undefined, regex: RegExp | undefined): boolean { // is any matched class
    const forms = mani?.forms;
    const form0 = forms?.[0]?.detection?.dlg_class;
    const form1 = forms?.[1]?.detection?.dlg_class;
    return regex ? !!form0?.match(regex) || !!form1?.match(regex) : !!form0 || !!form1;
}

// Misc

function stripFirstFolder(s: string): string {
    return (s || '').split(/[\/\\]/).slice(1).join('/');
}

// Utilities at field level

export function isAnyFieldManual(fields: Meta.Field[]): boolean {
    return !!fields.length && fields.some(({ path }: { path: Meta.Path; }) => path.sn);
}

// Utilities at mani form level

export function isIeServer(form: Mani.Form): boolean {
    return !!form.detection?.names_ext?.match(/Internet Explorer_Server/);
}

export function isIeProcess(form: Mani.Form): boolean {
    return !!form.detection?.processname?.match(/(iexplore|msedge|microsoftedgecp)\.exe"?$/i);
}
