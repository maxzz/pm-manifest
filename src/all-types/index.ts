export * as Mani from "./1-mani";
export * from "./1-mani/1-mani-field/1-field-typ";
export * from "./1-mani/2-mani-form/type-submit";
export * from "./1-mani/2-mani-form/type-token-ids";
export * from "./1-mani/1-mani-field/2-value-life";

export * from "./2-meta";
export * from "./3-catalog";

/**
 * Object.entries() type support
 */
export type Entries<T> = {
    [K in keyof T]: [K, T[K]];
}[keyof T][];
