export module Catalog {         // pmat/include/ots_storagecatalog_io.h
    export interface Descriptor {
        id?: string;            // default as guid
    }

    export interface Name {
        dispname: string;       // In Field this is "displayname"
        dbname: string;
        value?: string;

        ownernote?: string;     // This does not exist in Field

        askalways?: boolean;    // undefined : '1' 
        onetvalue?: boolean;    // undefined : '1'
        password?: boolean;     // undefined : '1'
    }

    export interface Root {
        descriptor?: Descriptor;
        names: Name[];
    }
}

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
