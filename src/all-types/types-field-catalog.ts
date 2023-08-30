import { Mani } from "./mani";

export module Catalog {         // pmat/include/ots_storagecatalog_io.h
    export type Descriptor = {
        id?: string;            // default as guid
    };

    export type Name = {
        dispname: string;       // In Field this is "displayname"
        dbname: string;

        value?: string;

        askalways?: boolean;    // undefined | '1'
        onetvalue?: boolean;    // undefined | '1'

        password?: boolean;     // undefined | '1'

        ownernote?: string;     // This does not exist in Field
    };

    type NameInCatalogFile = Omit<Mani.FieldValue, 'displayname'> & { // choosevalue not used in catalog file now, but will be stored in catalog file for future use
        dispname: string;
        ownernote?: string;
    };

    export type Root = {
        descriptor?: Descriptor;
        names: Name[];
    };
} //module Catalog

export type CatalogItem =       // Item in memory w/ meta information
    Catalog.Name
    & {
        index: number;          // index in loaded file.
        uuid: number;           // local (in memory only) unique ID (not updated through one session).
        mru: number;            // most recently used timestamp (as uuid but updated on each use through one session)
        newItem?: boolean;      // just for edit dialog: flag set when new item created so we scroll it into view and reset after scroll done
    };

export type FieldCatalog = {
    items: CatalogItem[];
};
