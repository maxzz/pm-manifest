import { Catalog, Mani } from "../all-types";

export function fieldToFieldCatalog(field: Mani.Field, dispname: string = '', dbname: string = ''): Catalog.Name {
    const { displayname, dbname: db, ...rest } = field;
    return {
        dispname: displayname || dispname,
        dbname: db || dbname,
        ...rest,
    };
}

export function fieldCatalogToField(fieldcatalog: Catalog.Name, field: Mani.Field, dispname: string = '', dbname: string = ''): Mani.Field {
    const { dispname: disp, dbname: db, ...rest } = fieldcatalog;
    return {
        ...field,
        displayname: disp || dispname,
        dbname: db || dbname,
        ...rest,
    };
}
