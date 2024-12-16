import * as Mani from "../1-mani";

export namespace CatalogFile {  // pmat/include/ots_storagecatalog_io.h

    export type Descriptor = {
        id?: string;            // default as guid
    };

    export type ItemInFile = Omit<Mani.FieldValue, 'displayname'> & { // choosevalue not used in catalog file now, but will be stored in catalog file for future use
        dispname: string;
    };

    export type Root = {
        descriptor?: Descriptor;
        names: ItemInFile[];
    };
}

export type CatalogItemEdit = { // Additional in memory only editor data, some entries may be replaced by reactive entities
    editor: {
        selected: boolean;      // just for edit dialog: valtio proxy reactive flag to indicate item in the list is selected
    };
};

export type CatalogItemMeta = { // Item in memory meta information
    index: number;              // index in loaded files list
    uuid: number;               // local (in memory only) unique ID (not updated through one session).
    //mru: number;              // most recently used timestamp (as uuid but updated on each use through one session); it'll be atom on client side
    //newItem?: boolean;        // seems like we don't need it anymore. just for edit dialog: flag set when new item created so we scroll it into view and reset after scroll done
};

export type CatalogItem = Prettify<
    & Mani.FieldValue
    & CatalogItemMeta           // Item in memory w/ meta information
    & CatalogItemEdit           //TODO: This may go to the client side, since CatalogItemMeta.selected may be atom, proxy, or something else.
>;

export type FieldCatalog = {
    descriptor: CatalogFile.Descriptor;
    items: CatalogItem[];
};
