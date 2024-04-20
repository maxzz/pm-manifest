import { Mani, Meta } from "../../../all-types";

export function isManual(fields: Meta.Field[]): boolean {
    return !!fields.length && fields.some(({ path }: { path: Meta.Path; }) => path.sn);
}

export function isIeServer(form: Mani.Form): boolean {
    return !!form.detection?.names_ext?.match(/Internet Explorer_Server/);
}

export function isIeProcess(form: Mani.Form): boolean {
    return !!form.detection?.processname?.match(/(iexplore|msedge|microsoftedgecp)\.exe"?$/i);
}
