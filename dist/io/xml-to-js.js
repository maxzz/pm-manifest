"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToXml = void 0;
const __1 = require("..");
//import { fileDownload } from '@/utils/file-download';
function convertToXml(fileUs) {
    if (!fileUs.raw) {
        return { error: 'empty file' };
    }
    let xml = '';
    try {
        // 1.
        xml = (0, __1.makeXML)(fileUs.mani) || '';
        //console.log('%c---------new xml from converted---------', 'color: green', `\n${xml}`);
        // 2.
        //fileDownload({ data: xml, filename: fileUs.fname, mime: 'text/plain;charset=utf-8' });
        return { xml };
    }
    catch (error) {
        (0, __1.showError)({ error });
        return { error: 'failed to convert' };
    }
}
exports.convertToXml = convertToXml;
