import { XMLParser } from 'fast-xml-parser';
import { TransformEncoding } from '../transforms';
//import test from '../../assets/{ff06f637-4270-4a0e-95a3-6f4995dceae6}.dpm';
export function beautifyXMLManifest(manifest) {
    // 0. convert XML .dpm object to manifest format.
    manifest.descriptor = manifest.descriptor?._attributes || {};
    manifest.forms = manifest.forms?.form || [];
    if (!Array.isArray(manifest.forms)) {
        manifest.forms = [manifest.forms];
    }
    manifest.forms.forEach((form) => {
        // Remove _attributes
        form.fcontext && (form.fcontext = form.fcontext._attributes);
        form.detection && (form.detection = form.detection._attributes);
        form.options && (form.options = form.options._attributes);
        if (form.fields) {
            let fields = form.fields.field;
            form.fields = Array.isArray(fields) ? fields : [fields];
        }
        // Perform typecast
        if (form.fcontext) {
            form.fcontext.name !== undefined && (form.fcontext.name = +form.fcontext.name);
        }
        if (form.detection) {
            form.detection.web_checkurl !== undefined && (form.detection.web_checkurl = !!form.detection.web_checkurl);
        }
        if (form.fields) {
            form.fields = form.fields.map(field => field._attributes);
            form.fields.forEach((field) => {
                field.password && (field.password = !!field.password);
                field.submit && (field.submit = !!field.submit);
                field.useit && (field.useit = !!field.useit);
                field.rfieldindex && (field.rfieldindex = +field.rfieldindex);
            });
        }
    });
    if (manifest.options?.processes) {
        manifest.options.processes = manifest.options.processes.process || [];
        if (!Array.isArray(manifest.options.processes)) {
            manifest.options.processes = [manifest.options.processes];
        }
        manifest.options.processes = manifest.options.processes.map((process) => process._attributes);
    }
    return manifest;
}
export function beautifyXMLCatalog(catalog) {
    catalog.names = catalog?.names?.name || [];
    catalog.names = catalog.names.map((item) => item?._attributes).filter(Boolean);
    return catalog;
}
export const parseOptionsRead = {
    attributeNamePrefix: "",
    attributesGroupName: "_attributes",
    ignoreAttributes: false,
    allowBooleanAttributes: true,
};
export function parseXMLFile(cnt) {
    const parser = new XMLParser(parseOptionsRead);
    const obj = parser.parse(cnt); //console.log('%craw', 'color: green', JSON.stringify(obj, null, 4));
    return {
        mani: obj?.manifest && beautifyXMLManifest(obj.manifest),
        fcat: obj?.storagecatalog && beautifyXMLCatalog(obj?.storagecatalog),
    };
}
export var Matching;
(function (Matching) {
    let Style;
    (function (Style) {
        Style[Style["undef"] = 0] = "undef";
        Style[Style["makeDomainMatch"] = 1] = "makeDomainMatch";
        Style[Style["regex"] = 2] = "regex";
        Style[Style["wildcard"] = 3] = "wildcard";
        Style[Style["skipDomainMatch"] = 4] = "skipDomainMatch";
    })(Style = Matching.Style || (Matching.Style = {}));
    let Options;
    (function (Options) {
        Options[Options["undef"] = 0] = "undef";
        Options[Options["caseinsensitive"] = 1] = "caseinsensitive";
        Options[Options["matchtext"] = 2] = "matchtext";
        Options[Options["usequery"] = 4] = "usequery";
        Options[Options["pmacSet"] = 8] = "pmacSet";
    })(Options = Matching.Options || (Matching.Options = {}));
    Matching.reUrlMatchCheck = /^\[m0\]\:.\:.\:/; // this regex to quickly check the start of url if any matching is set
    //export const reUrlMatchRegex = /^\[m0\]\:3\:.\:/; // this can be 3 or 8: /^\[m0\]\:8\:.\:/   // this regex to quickly check the start of url if regex matching is set
    Matching.addPrefixRegex = '[m0]:3:8:'; // this prefix is to add the start of url as regex match to exclude from DomainMatch
    const reOtsMatching = /^\[m0\]:([0-4]):([01248ace]{1,4}):\s*(.+)/; // 0: [m0]; 1:style; 2:options; 3:pattern. Example: web_murl="[m0]:2:2:https^2dot;//maxzz.github.io/test-pm/"
    function getMatchRawData(murl) {
        let rv = { style: Style.undef, opt: Options.undef, url: murl || '', }; // don't need call restoreCpp(murl) here.
        let m = murl?.match(reOtsMatching); // TODO: do we need to resrt reOtsMatching.lastIndex before match?
        if (m) {
            rv.style = +m[1]; // style
            rv.opt = +m[2]; // options
            rv.url = TransformEncoding.cppRestore(m[3]); // pattern
        }
        return rv;
    }
    Matching.getMatchRawData = getMatchRawData;
    function makeRawMatchData({ style, opt, url }, ourl) {
        url = (style !== Style.undef ? url || '' : ourl).trim();
        return style !== Style.undef || opt !== Options.undef ? `[m0]:${style}:${opt}:${TransformEncoding.colonEscape(url)}` : url;
    }
    Matching.makeRawMatchData = makeRawMatchData;
    function styleName(style) {
        const names = {
            1: 'use domain match',
            2: 'regex',
            3: 'wildcard',
            4: 'don\'t match this in domain', // Style.skipDomainMatch
        };
        return names[style] || `${style}`;
    }
    function getMatchInfo(murl) {
        const raw = getMatchRawData(murl);
        if (raw.style || raw.opt) {
            const { style, opt, url } = raw;
            let resOpt = [];
            (opt & 1) !== 0 && (resOpt.push('case insensitive')); // Options.caseinsensitive
            (opt & 2) !== 0 && (resOpt.push('match ext.')); // Options.matchtext
            let resStyle = styleName(style);
            return {
                prefix: `[m0]:${style}:${opt}`,
                join: `${resStyle}${resOpt.length ? `; Options: ${resOpt.join(', ')}` : ''}`,
                url,
            };
        }
    }
    Matching.getMatchInfo = getMatchInfo;
})(Matching || (Matching = {})); //namespace Matching
