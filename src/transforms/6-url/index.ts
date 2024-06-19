import * as tmUrl from "./url";

export const tmurl = tmUrl;

/**
 * DP manual mode and win32 apps don't have url, but Navi sent these manifests anyway.
 * 'fake.domain' returned for all empty strings.
 */
export function urlDomain(url: string): string {
    const parts =
        url
            ? tmurl.url(url) //TODO: This can be regex and tmurl.url() will fail.
            : {};
    return parts.domain || parts.hostname || parts.path || '';  // path is specified for 'file' protocol.
}

export function removeQuery(url: string | undefined): string {
    return (url || '')
        .split('?')[0]
        .split('#')[0];
}
