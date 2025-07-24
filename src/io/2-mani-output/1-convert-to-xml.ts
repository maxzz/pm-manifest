import { type Mani, type FileMani, type CatalogFile } from "../../all-types";
import { convertJsToXml } from "./7-all";
import { prepareNewFc4Xml, prepareNewMani4Xml } from "./8-make-new-manifest-for-xml";

export function convertToXmlString(params: { mani?: FileMani.Manifest, fc?: CatalogFile.Root; }): ConvertToXmlStringResult {
    try {
        let objForXml: object | undefined;

        if (params.mani) {
            objForXml = prepareNewMani4Xml(params.mani as Mani.Manifest);
        } else if (params.fc) {
            objForXml = prepareNewFc4Xml(params.fc);
        }

        if (!objForXml) {
            return { error: 'failed to convert' };
        }

        const xml = convertJsToXml(objForXml) || '';
        return { xml };
    } catch (error) {
        return { error: 'Failed to convert' + error };
    }
}

export type ConvertToXmlStringResult =
    | {
        error: string;
        xml?: undefined;
    }
    | {
        xml: string;
        error?: undefined;
    };
