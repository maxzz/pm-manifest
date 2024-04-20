import { Mani } from "../../all-types";
import { parseOptionsRead } from '../1-mani-input/3-parse-xml-file';
import { showError } from "../5-mani-show-error";
import { TransformEncoding } from "../../transforms";
import { J2xParser } from "../../utils/json2xml";
import { makeNewManifest4Xml } from "./1-make-new-manifest-for-xml";

export const parseOptionsWrite = {
    ...parseOptionsRead,
    format: true,
    indentBy: '\t',
    attrValueProcessor: (attrValue: string | any, attrName: string): string => {
        const val =
            typeof attrValue === 'string'
                ? TransformEncoding.xmlEscape(attrValue)
                : typeof attrValue === 'boolean'
                    ? attrValue ? '1' : '0'
                    : attrValue;
        // console.log(`    ${attrName} = ${val}`);
        return val;
    }
};

export function makeXML(mani: Mani.Manifest | undefined): string | undefined {
    const rv = mani && makeNewManifest4Xml(mani);
    if (rv) {
        try {
            const j2xParser = new J2xParser(parseOptionsWrite);
            const xml = j2xParser.parse(rv);
            return `<?xml version="1.0" encoding="UTF-8"?>\n${xml}`;
        } catch (error) {
            showError(error);
        }
    }
}

//TODO: parseOptionsWrite.attrValueProcessor(): convert value life and skip '=== undefined'
