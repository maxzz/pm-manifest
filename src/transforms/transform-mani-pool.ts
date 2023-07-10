import { Mani } from "../all-types";
import { TransformEncoding } from "./transform-xml-enc";

// Manifest specific functions

export function splitPool(pool: string | undefined): string[] {
    return pool?.split(':') || [];
}

export function getPool(form: Mani.Form): string[] {
    return splitPool(form?.detection?.names_ext);
}

export function getPoolName(pool: string[], index: string): string {
    if (!index) {
        return '';
    }

    let n: number = index !== '' ? parseInt(`0x${index}`, 16) : -1;
    if (n < pool.length && n >= 0) {
        return TransformEncoding.removeEscapeChars(pool[n], '\\');
    }
    
    return '????????????';
}
