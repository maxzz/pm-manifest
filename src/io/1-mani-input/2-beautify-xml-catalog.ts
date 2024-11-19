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
        item.dispname = item.dispname ? TransformEncoding.xmlRestore(item.dispname) : '';
        item.value = item.value ? TransformEncoding.xmlRestore(item.value) : '';
        item.choosevalue = item.choosevalue ? TransformEncoding.xmlRestore(item.choosevalue) : '';
    });

    return catalog;
}
