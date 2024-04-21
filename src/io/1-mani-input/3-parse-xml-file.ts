import { CatalogFile, Mani } from "../../all-types";
import { XMLParser } from "fast-xml-parser";
import { beautifyXMLManifest } from "./1-beautify-xml-manifest";
import { beautifyXMLCatalog } from "./2-beautify-xml-catalog";

export const parseOptionsRead = {
    attributeNamePrefix: "",
    attributesGroupName: "_attributes",
    ignoreAttributes: false,
    allowBooleanAttributes: true,
};

export type ParseManifestResult = {
    mani?: Mani.Manifest;
    fcat?: CatalogFile.Root;
};

export function parseXMLFile(cnt: string): ParseManifestResult {
    const parser = new XMLParser(parseOptionsRead);
    
    const obj = parser.parse(cnt); //console.log('%craw', 'color: green', JSON.stringify(obj, null, 4));
    
    return {
        mani: obj?.manifest && beautifyXMLManifest(obj.manifest),
        fcat: obj?.storagecatalog && beautifyXMLCatalog(obj?.storagecatalog),
    };
}
