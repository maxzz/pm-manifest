import { type CatalogFile } from "../../all-types";

export function beautifyXMLCatalog(catalog: CatalogFile.Root): CatalogFile.Root {
    catalog.names = (catalog as any)?.names?.name || [];

    if (!Array.isArray(catalog.names)) {
        catalog.names = [catalog.names];
    }

    catalog.names = catalog.names
        .map((item: any) => item?._attributes)
        .filter(Boolean);

    return catalog;
}
