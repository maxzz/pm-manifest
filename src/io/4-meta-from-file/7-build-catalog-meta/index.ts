import { type CatalogFile, type CatalogItem, type FieldCatalog, type Mani } from "../../../all-types";
import { uuid } from "../../../utils";

// Field catalog transformation

export function fcItemInFileFromFieldValue(fieldValue: Mani.FieldValue): CatalogFile.ItemInFile {
    const { displayname, ...rest } = fieldValue;
    return {
        dispname: displayname,
        ...rest,
    };
}

export function fcItemInFileToFieldValue(catalogName: CatalogFile.ItemInFile): Mani.FieldValue {
    const { dispname, ...rest } = catalogName;
    return {
        displayname: dispname,
        ...rest,
    };
}

function addFcItemInMemInfo(catalogName: CatalogFile.ItemInFile, idx: number): CatalogItem {
    const now = uuid.asRelativeNumber();
    return {
        ...fcItemInFileToFieldValue(catalogName),
        index: idx,
        uuid: now,
        editor: {
            selected: false,
        },
    };
}

export function fcFileToFcInMemory(fcat: CatalogFile.Root | undefined): FieldCatalog {

    const rv: FieldCatalog = {
        descriptor: fcat?.descriptor || {},
        items: fcat?.names?.map(addFcItemInMemInfo) || [],
    };

    return rv;
}
