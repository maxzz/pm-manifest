export var TransformEncoding;
(function (TransformEncoding) {
    function removeEscapeChars(s, escapeChar) {
        // 0. '\1\\ab\2\.3' --> '1\ab2.3' with escapeChar: '\' i.e. remove non duplicated.
        return s; // TODO: //C:\Y\git\pm\Include\atl\atl_strings.h::removeEscapeChars()
    }
    TransformEncoding.removeEscapeChars = removeEscapeChars;
    function swapKeyValPairs(obj) {
        return Object.fromEntries(Object.entries(obj).map(([key, val]) => [val, key]));
    }
    // C++
    const forwardCpp = {
        "^up;": "^",
        "^at;": "@",
        "^dot;": ".",
        "^2dot;": ":",
        "^escape;": '\x1b',
        "%0d": "\r",
        "%0a": "\n",
    };
    const reverseCpp = swapKeyValPairs(forwardCpp);
    const reForwardCpp = /(\^up;|\^at;|\^dot;|\^2dot;|\^escape;|%0d|%0a)/g; // regex.lastIndex specifies the index at which to start the next match, not for replace all.
    const reReverseCpp = /[\^@\.:\x1b\r\n]/g;
    function cppRestore(s) {
        return s ? s.replace(reForwardCpp, (m) => forwardCpp[m]) : '';
    }
    TransformEncoding.cppRestore = cppRestore;
    function cppEscape(s) {
        return s ? s.replace(reReverseCpp, (m) => reverseCpp[m]) : '';
    }
    TransformEncoding.cppEscape = cppEscape;
    function colonEscape(s) {
        return s ? s.replace(/:/g, '^2dot;') : '';
    }
    TransformEncoding.colonEscape = colonEscape;
    // XML
    const forwardXml = {
        "&lt;": "<",
        "&gt;": ">",
        "&amp;": "&",
        "&quot;": "\"",
        "&apos;": "\'",
        "%0d": "\r",
        "%0a": "\n",
    };
    const reverseXml = swapKeyValPairs(forwardXml);
    const reForwardXml = /(&lt;|&gt;|&amp;|&quot;|&apos;|%0d|%0a)/g;
    const reReverseXml = /[<>&"'\r\n]/g;
    function xmlRestore(s) {
        return s ? s.replace(reForwardXml, (m) => forwardXml[m]) : '';
    }
    TransformEncoding.xmlRestore = xmlRestore;
    function xmlEscape(s) {
        return s ? s.replace(reReverseXml, (m) => reverseXml[m]) : '';
    }
    TransformEncoding.xmlEscape = xmlEscape;
    // Persent encoding
    function persentRemove(s) {
        // decodeURI will fail on: &lt;input name=&quot;Sign in name&quot; tabindex=&quot;1&quot; id=&quot;signInName&quot; type=&quot;email&quot; placeholder=&quot;Email Address&quot; pattern=&quot;^[a-zA-Z0-9.!#$%&amp;amp;’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$&quot; value=&quot;&quot;&gt;
        try {
            return decodeURI(s); //TODO: decodeURI does not do all % encodings //TODO: decodeURI will not work on URL params
        }
        catch (error) {
            return s;
        }
    }
    TransformEncoding.persentRemove = persentRemove;
})(TransformEncoding || (TransformEncoding = {})); //namespace TransformEncoding
