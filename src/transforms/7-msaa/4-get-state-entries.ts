import { MSAA_STATE } from "./3-constants-state";

export function getEnumNumberEntries<T extends object>(objEnum: T) {
    return Object.entries(objEnum).filter(([key]) => Number.isInteger(+key));
}

export function getEnumNamedEntries<T extends object>(objEnum: T) {
    return Object.entries(objEnum).filter(([key]) => !Number.isInteger(+key));
}
let MSAA_STATE_NAMED: [string, number][] | undefined;

export function getStateEntries(state: string | undefined): string[] | undefined {
    if (!state) {
        return;
    }

    let rv: string[] = [];
    let num = parseInt(state, 16);

    if (!Number.isNaN(num) && num) {

        if (!MSAA_STATE_NAMED) {
            MSAA_STATE_NAMED = getEnumNamedEntries(MSAA_STATE) as [string, number][];
        }

        let key = 0;
        while (num && key < MSAA_STATE_NAMED.length) {
            const [k, v] = MSAA_STATE_NAMED[key++];
            if ((num & v) !== 0) {
                num = num & ~v;
                rv.push(k);
            }
        }
    }

    return rv.length ? rv : undefined;
}
