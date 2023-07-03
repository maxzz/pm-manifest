function buildOptions(options, defaultOptions, props) {
    if (!options) {
        return defaultOptions; //if there are not options
    }
    //parse Empty Node as self closing node
    let newOptions = {};
    for (let i = 0; i < props.length; i++) {
        const key = props[i];
        newOptions[key] = options[key] !== undefined ? options[key] : defaultOptions[key];
    }
    return newOptions;
}
;
const defaultOptions = {
    attributeNamePrefix: '@_',
    attributesGroupName: false,
    textNodeName: '#text',
    ignoreAttributes: true,
    cdataTagName: '',
    cdataPositionChar: '\\c',
    format: false,
    indentBy: '  ',
    supressEmptyNode: false,
    tagValueProcessor: function (a) { return '' + a; },
    attrValueProcessor: function (a) { return '' + a; },
    doReduceEmptyValues: false,
    doAttrsIndent: true,
    doAttrsEndingIndent: true,
};
const props = [
    'attributeNamePrefix',
    'attributesGroupName',
    'textNodeName',
    'ignoreAttributes',
    'cdataTagName',
    'cdataPositionChar',
    'format',
    'indentBy',
    'supressEmptyNode',
    'tagValueProcessor',
    'attrValueProcessor',
    'rootNodeName',
    'doReduceEmptyValues',
    'doAttrsIndent',
    'doAttrsEndingIndent',
];
// const doReduceEmptyValues = false;  // Reduce attrs closing on empty    values true: <field /> false: <field></field>
// const doAttrsIndent = true;         // Attribute indentation            true: <field \nattr ... \nattr /> false: <field attr attr />
// const doAttrsEndingIndent = false;  // Attrs ending indented            true: <field ... \n/> false: <field ... />
export class J2xParser {
    constructor(options) {
        this.tagEndChar = '>\n';
        this.newLine = '\n';
        this.options = buildOptions(options || {}, defaultOptions, props);
        if (this.options.ignoreAttributes || this.options.attributesGroupName) {
            this.attrPrefixLen = 0;
            this.isAttribute = () => false;
        }
        else {
            this.attrPrefixLen = this.options.attributeNamePrefix.length;
            this.isAttribute = isAttribute;
        }
        this.isCDATA = this.options.cdataTagName ? isCDATA : () => false;
        this.replaceCDATAstr = _replaceCDATAstr;
        this.replaceCDATAarr = _replaceCDATAarr;
        if (this.options.format) {
            this.indentate = indentate;
            this.tagEndChar = '>\n';
            this.newLine = '\n';
        }
        else {
            this.indentate = () => '';
            this.tagEndChar = '>';
            this.newLine = '';
        }
        this.textofTextValNode = this.options.supressEmptyNode ? this._textofTextNode : this._textofTextValNodeWithoutEmptyCheck;
        this.textofObjectNode = this.options.supressEmptyNode ? this._textofObjNode : this._textofObjectNodeWithoutEmptyCheck;
    }
    parse(jObj) {
        if (Array.isArray(jObj) && this.options.rootNodeName && this.options.rootNodeName.length > 1) {
            jObj = {
                [this.options.rootNodeName]: jObj
            };
        }
        return this.j2x(jObj, 0).val;
    }
    j2x(jObj, level) {
        let attrStr = [];
        let val = '';
        for (let key in jObj) {
            const keyVal = jObj[key];
            if (typeof keyVal === 'undefined') {
                // supress undefined node
            }
            else if (keyVal === null) {
                val += `${this.indentate(level)}<${key}/${this.tagEndChar}`;
            }
            else if (keyVal instanceof Date) {
                val += this.textofTextValNode(keyVal, key, [], level);
            }
            else if (typeof keyVal !== 'object') {
                //premitive type
                const attr = this.isAttribute(key);
                if (attr) {
                    attrStr.push(`${attr}="${this.options.attrValueProcessor(keyVal, attr)}"`);
                }
                else if (this.isCDATA(key)) {
                    if (jObj[this.options.textNodeName]) {
                        val += this.replaceCDATAstr(jObj[this.options.textNodeName], keyVal);
                    }
                    else {
                        val += this.replaceCDATAstr('', keyVal);
                    }
                }
                else {
                    //tag value
                    if (key === this.options.textNodeName) {
                        if (jObj[this.options.cdataTagName]) { //tm: this will not work
                            //value will added while processing cdata
                        }
                        else {
                            val += this.options.tagValueProcessor(keyVal);
                        }
                    }
                    else {
                        val += this.textofTextValNode(keyVal, key, [], level);
                    }
                }
            }
            else if (Array.isArray(keyVal)) {
                //repeated nodes
                if (this.isCDATA(key)) {
                    val += this.indentate(level);
                    if (jObj[this.options.textNodeName]) {
                        val += this.replaceCDATAarr(jObj[this.options.textNodeName], keyVal);
                    }
                    else {
                        val += this.replaceCDATAarr('', keyVal);
                    }
                }
                else {
                    //nested nodes
                    const arrLen = keyVal.length;
                    for (let j = 0; j < arrLen; j++) {
                        const item = keyVal[j];
                        if (typeof item === 'undefined') {
                            // supress undefined node
                        }
                        else if (item === null) {
                            val += `${this.indentate(level)}<${key}/${this.tagEndChar}`;
                        }
                        else if (typeof item === 'object') {
                            val += this.processTextOrObjNode(item, key, level);
                        }
                        else {
                            val += this.textofTextValNode(item, key, [], level);
                        }
                    }
                }
            }
            else {
                //nested node
                if (this.options.attributesGroupName && key === this.options.attributesGroupName) {
                    const Ks = Object.keys(keyVal);
                    const L = Ks.length;
                    for (let j = 0; j < L; j++) {
                        const attrName = Ks[j];
                        attrStr.push(`${attrName}="${this.options.attrValueProcessor(keyVal[attrName], attrName)}"`);
                    }
                }
                else {
                    val += this.processTextOrObjNode(keyVal, key, level);
                }
            }
        }
        return { attrStr: attrStr, val: val };
    }
    ;
    processTextOrObjNode(object, key, level) {
        const result = this.j2x(object, level + 1);
        if (object[this.options.textNodeName] !== undefined && Object.keys(object).length === 1) {
            return this.textofTextValNode(result.val, key, result.attrStr, level);
        }
        else {
            return this.textofObjectNode(result.val, key, result.attrStr, level);
        }
    }
    // Formatted output
    _textofObjectNodeWithoutEmptyCheck(val, key, attrStr, level) {
        const attrs = this.attrsToStr(attrStr, level);
        const reduce = this.options.doAttrsIndent && !val;
        const front = reduce ? this.options.doAttrsEndingIndent ? `${this.newLine}${this.indentate(level)}/${this.tagEndChar}` : ` /${this.tagEndChar}` : '';
        const doEmpty = this.options.doReduceEmptyValues && !val;
        let ending;
        if (attrStr.length && val.indexOf('<') === -1) {
            ending = reduce ? front : doEmpty ? ` /${this.tagEndChar}` : `>${val}</${key}${this.tagEndChar}`;
        }
        else {
            ending = reduce ? front : doEmpty ? ` /${this.tagEndChar}` : `${this.tagEndChar}${val}${this.indentate(level)}</${key}${this.tagEndChar}`;
        }
        return `${this.indentate(level)}<${key}${attrs}${ending}`;
    }
    _textofTextValNodeWithoutEmptyCheck(val, key, attrStr, level) {
        const attrs = this.attrsToStr(attrStr, level);
        const reduce = this.options.doAttrsIndent && !val;
        const front = reduce ? this.options.doAttrsEndingIndent ? `${this.newLine}${this.indentate(level)}/${this.tagEndChar}` : ` /${this.tagEndChar}` : '';
        const clearVal = this.options.tagValueProcessor(val);
        const doEmpty = this.options.doReduceEmptyValues && !clearVal;
        const ending = reduce ? front : doEmpty ? ` /${this.tagEndChar}` : `>${clearVal}</${key}${this.tagEndChar}`;
        return `${this.indentate(level)}<${key}${attrs}${ending}`;
    }
    // Empty guards
    _textofObjNode(val, key, attrStr, level) {
        if (val !== '') {
            return this._textofObjectNodeWithoutEmptyCheck(val, key, attrStr, level);
        }
        else {
            const attrs = this.attrsToStr(attrStr, level);
            return `${this.indentate(level)}<${key}${attrs}/${this.tagEndChar}`; //+ this.newLine
        }
    }
    _textofTextNode(val, key, attrStr, level) {
        if (val !== '') {
            return this._textofTextValNodeWithoutEmptyCheck(val, key, attrStr, level);
        }
        else {
            const attrs = this.attrsToStr(attrStr, level);
            return `${this.indentate(level)}<${key}${attrs}/${this.tagEndChar}`;
        }
    }
    attrsToStr(attrs, level) {
        const indent = this.indentate(level + 1);
        return attrs.map(attr => this.options.doAttrsIndent ? `\n${indent}${attr}` : ` ${attr}`).join('');
    }
} //class J2xParser
// replace CDATA
function _replaceCDATAstr(str, cdata) {
    str = this.options.tagValueProcessor(str);
    if (this.options.cdataPositionChar === '' || str === '') {
        return `${str}<![CDATA[${cdata}]]${this.tagEndChar}`;
    }
    else {
        return str.replace(this.options.cdataPositionChar, `<![CDATA[${cdata}]]${this.tagEndChar}`);
    }
}
function _replaceCDATAarr(str, cdata) {
    str = this.options.tagValueProcessor(str);
    if (this.options.cdataPositionChar === '' || str === '') {
        return `${str}<![CDATA[${cdata.join(']]><![CDATA[')}]]${this.tagEndChar}`;
    }
    else {
        for (let v in cdata) {
            str = str.replace(this.options.cdataPositionChar, `<![CDATA[${cdata[v]}]]>`);
        }
        return str + this.newLine;
    }
}
// Misc
function isAttribute(name /*, options*/) {
    if (name.startsWith(this.options.attributeNamePrefix)) {
        return name.substr(this.attrPrefixLen);
    }
    else {
        return false;
    }
}
function isCDATA(name) {
    return name === this.options.cdataTagName;
}
function indentate(level) {
    return this.options.indentBy.repeat(level);
}
//formatting - done
//indentation - done
//\n after each closing or self closing tag - done
