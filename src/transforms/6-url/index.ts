import * as tmUrl from "./url";

export const tmurl = tmUrl;

export function urlDomain(url: string): string {
    // DP manual mode and win32 apps don't have url, but Navi sent these manifests anyway.
    // 'fake.domain' returned for all empty strings.
   
    const u = url
        ? tmurl.url(url) //TODO: This can be regex and tmurl.url() will fail.
        : {};

    return u.domain || u.hostname || u.path || '';  // path is specified for 'file' protocol.
}

export function removeQuery(url: string | undefined): string {
    return (url || '')
        .split('?')[0]
        .split('#')[0];
}
