import { TransformEncoding } from "./transform-xml-enc";
// Manifest specific functions
export function getPool(form) {
    return form && form.detection && form.detection.names_ext ? form.detection.names_ext.split(':') : [];
}
export function getPoolName(pool, index) {
    if (!index) {
        return '';
    }
    let n = index !== '' ? parseInt(`0x${index}`, 16) : -1;
    if (n < pool.length && n >= 0) {
        return TransformEncoding.removeEscapeChars(pool[n], '\\');
    }
    return '????????????';
}
