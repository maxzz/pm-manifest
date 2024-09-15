import { type Mani } from "../../../all-types";

// This was optimization to save space in the XML

export function detectionUrlsUnpack(detection: Mani.Detection) {
    detection.web_murl = detection.web_murl || detection.web_ourl;
    detection.web_qurl = detection.web_qurl || detection.web_ourl;
}

export function detectionUrlsPack(detection: Mani.Detection) {
    if (detection.web_murl === detection.web_ourl) {
        delete detection.web_murl;
    }

    if (detection.web_qurl === detection.web_ourl) {
        delete detection.web_qurl;
    }
}
