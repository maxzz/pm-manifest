import { parseOptionsRead } from "../1-mani-input/3-parse-xml-file";
import { showError } from "../5-mani-show-error";
import { TransformEncoding } from "../../transforms";
import { J2xParser } from "../../utils/2-json2xml";

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

export function convertJsToXml(obj: object | undefined): string | undefined {
    //const rv = mani && makeNewManifest4Xml(mani);
    if (obj) {
        try {
            const j2xParser = new J2xParser(parseOptionsWrite);
            const xml = j2xParser.parse(obj);
            return `<?xml version="1.0" encoding="UTF-8"?>\n${xml}`;
        } catch (error) {
            showError(error);
        }
    }
}

//TODO: parseOptionsWrite.attrValueProcessor(): convert value life and skip '=== undefined'
