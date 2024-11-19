import { type CatalogFile } from "../../all-types";
import { TransformEncoding } from "../../transforms";

export function beautifyXMLCatalog(catalog: CatalogFile.Root): CatalogFile.Root {
    catalog.names = (catalog as any)?.names?.name || [];

    if (!Array.isArray(catalog.names)) {
        catalog.names = [catalog.names];
    }

    catalog.names = catalog.names
        .map((item: any) => item?._attributes)
        .filter(Boolean);

    //TODO: Check: Was this missing for manifest? and for save as well.

    catalog.names.forEach((item: CatalogFile.ItemInFile) => {
        item.dispname !== undefined && (item.dispname = TransformEncoding.cppRestore(item.dispname));
        item.value !== undefined && (item.value = TransformEncoding.cppRestore(item.value));
        item.choosevalue !== undefined && (item.choosevalue = TransformEncoding.cppRestore(item.choosevalue));
    });

    return catalog;
}
