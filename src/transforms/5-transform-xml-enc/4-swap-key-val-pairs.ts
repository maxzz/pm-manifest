export function swapKeyValPairs<T extends object>(obj: T) {
    return Object.fromEntries(Object.entries(obj).map(([key, val]) => [val, key]));
}
