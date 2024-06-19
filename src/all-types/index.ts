export * as Mani from "./1-mani";

export * from "./mpath";
export * from "./meta";

export * from "./type-field-type";
export * from "./type-submit";
export * from "./type-token-ids";
export * from "./type-value-life";
export * from "./types-field-catalog";

/**
 * Object.entries() type support
 */
export type Entries<T> = {
    [K in keyof T]: [K, T[K]];
}[keyof T][];
