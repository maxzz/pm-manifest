import { type CatalogFile, type CatalogItem, type FieldCatalog, type Mani } from "../../../all-types";
import { uuid } from "../../../utils";

// Field catalog transformation

export function catalogItemInFileToFieldValue(catalogName: CatalogFile.ItemInFile): Mani.FieldValue {
    const { dispname, ...rest } = catalogName;
    return {
        displayname: dispname,
        ...rest,
    };
}

export function fieldValueToCatalogItemInFile(fieldValue: Mani.FieldValue): CatalogFile.ItemInFile {
    const { displayname, ...rest } = fieldValue;
    return {
        dispname: displayname,
        ...rest,
    };
}

export function buildCatalogMetaFromNames(catalogNames: CatalogFile.ItemInFile[] | undefined): FieldCatalog {
    const items = catalogNames?.map(addInMemInfo) || [];
    return {
        items,
    };

    function addInMemInfo(catalogName: CatalogFile.ItemInFile, idx: number): CatalogItem {
        const now = uuid.asRelativeNumber();
        return {
            ...catalogItemInFileToFieldValue(catalogName),
            index: idx,
            uuid: now,
            editor: {
                selected: false,
            },
        };
    }
}

export function buildCatalogMeta(fcat: CatalogFile.Root | undefined): FieldCatalog {
    //TODO: handle addtional info
    return buildCatalogMetaFromNames(fcat?.names);
}
