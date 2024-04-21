import { swapKeyValPairs } from "./4-swap-key-val-pairs";

const forwardXml = {
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&quot;": "\"",
    "&apos;": "\'",
    "%0d": "\r",
    "%0a": "\n",
};

const reverseXml = swapKeyValPairs(forwardXml);

const reForwardXml = /(&lt;|&gt;|&amp;|&quot;|&apos;|%0d|%0a)/g;
const reReverseXml = /[<>&"'\r\n]/g;

export function xmlRestore(s: string): string { //C:\Y\c\dp\pm\Components\Include\atl\atl_strings.h::xml_remove()
    return s ? s.replace(reForwardXml, (m) => forwardXml[m as keyof typeof forwardXml]) : '';
}

export function xmlEscape(s: string): string {
    return s ? s.replace(reReverseXml, (m) => reverseXml[m]) : '';
}

// Persent encoding

export function persentRemove(s: string): string {
    // decodeURI will fail on: &lt;input name=&quot;Sign in name&quot; tabindex=&quot;1&quot; id=&quot;signInName&quot; type=&quot;email&quot; placeholder=&quot;Email Address&quot; pattern=&quot;^[a-zA-Z0-9.!#$%&amp;amp;’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$&quot; value=&quot;&quot;&gt;
    try {
        return decodeURI(s); //TODO: decodeURI does not do all % encodings //TODO: decodeURI will not work on URL params
    } catch (error) {
        return s;
    }
}
