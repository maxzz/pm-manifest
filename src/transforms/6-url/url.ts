/*
    // https://github.com/websanova/js-url <- has no npm deployment; 2.5.3; was released on Apr 5, 2018
    url();            // http://rob:abcd1234@www.example.co.uk/path/index.html?query1=test&silly=willy&field[0]=zero&field[2]=two#test=hash&chucky=cheese
    url('tld');       // co.uk
    url('domain');    // example.co.uk
    url('hostname');  // www.example.co.uk
    url('sub');       // www
    url('.0')         // undefined
    url('.1')         // www
    url('.2')         // example
    url('.-1')        // uk
    url('auth')       // rob:abcd1234
    url('user')       // rob
    url('pass')       // abcd1234
    url('port');      // 80
    url('protocol');  // http
    url('path');      // /path/index.html
    url('file');      // index.html
    url('filename');  // index
    url('fileext');   // html
    url('1');         // path
    url('2');         // index.html
    url('3');         // undefined
    url('-1');        // index.html
    url(1);           // path
    url(2);           // index.html
    url(-1);          // index.html
    url('query');     // query1=test&silly=willy
    url('?');         // {query1: 'test', silly: 'willy', field: ['zero', undefined, 'two']}
    url('?silly');    // willy
    url('?poo');      // undefined
    url('field[0]')   // zero
    url('field')      // ['zero', undefined, 'two']
    url('hash');      // test=hash&chucky=cheese
    url('#');         // {test: 'hash', chucky: 'cheese'}
    url('#chucky');   // cheese
    url('#poo');      // undefined
*/
/*
    Uniform Resource Identifier (Uri) http://tools.ietf.org/html/rfc3986.
    This class is a simple parser which creates the basic component parts
    (http://tools.ietf.org/html/rfc3986#section-3) with minimal validation
    and encoding.
    https://github.com/Microsoft/monaco-editor/blob/3acd0a1/monaco.d.ts#L83

        foo://example.com:8042/over/there?name=ferret#nose
        \_/   \______________/\_________/ \_________/ \__/
        |           |            |            |        |
        scheme     authority       path        query   fragment
        |   _____________________|__
        / \ /                        \
        urn:example:animal:ferret:nose
*/

export interface IUrlParts {
    protocol?: string;
    email?: string;
    hash?: string;
    query?: string;
    path?: string;
    //file?: string;
    //filename?: string;
    //fileext?: string;
    port?: string;
    auth?: string;
    user?: string;
    pass?: string;
    hostname?: string;
    tld?: string;
    domain?: string;
    sub?: string;
    domainhost?: string; // combination of domain or host name if domain is missing
    //queries
    //"tld?"?: string;
    //"?"?: string;
    //"#"?: string;
    //"."?: string;
    //"{}"?: string;
}

type IUrlKeys = keyof IUrlParts;

//export namespace tmurl {

const _t = new RegExp(/(.*?)\.?([^\.]*?)\.(gl|com|net|org|biz|ws|in|me|co\.uk|co|org\.uk|ltd\.uk|plc\.uk|me\.uk|edu|mil|br\.com|cn\.com|eu\.com|hu\.com|no\.com|qc\.com|sa\.com|se\.com|se\.net|us\.com|uy\.com|ac|co\.ac|gv\.ac|or\.ac|ac\.ac|af|am|as|at|ac\.at|co\.at|gv\.at|or\.at|asn\.au|com\.au|edu\.au|org\.au|net\.au|id\.au|be|ac\.be|adm\.br|adv\.br|am\.br|arq\.br|art\.br|bio\.br|cng\.br|cnt\.br|com\.br|ecn\.br|eng\.br|esp\.br|etc\.br|eti\.br|fm\.br|fot\.br|fst\.br|g12\.br|gov\.br|ind\.br|inf\.br|jor\.br|lel\.br|med\.br|mil\.br|net\.br|nom\.br|ntr\.br|odo\.br|org\.br|ppg\.br|pro\.br|psc\.br|psi\.br|rec\.br|slg\.br|tmp\.br|tur\.br|tv\.br|vet\.br|zlg\.br|br|ab\.ca|bc\.ca|mb\.ca|nb\.ca|nf\.ca|ns\.ca|nt\.ca|on\.ca|pe\.ca|qc\.ca|sk\.ca|yk\.ca|ca|cc|ac\.cn|com\.cn|edu\.cn|gov\.cn|org\.cn|bj\.cn|sh\.cn|tj\.cn|cq\.cn|he\.cn|nm\.cn|ln\.cn|jl\.cn|hl\.cn|js\.cn|zj\.cn|ah\.cn|gd\.cn|gx\.cn|hi\.cn|sc\.cn|gz\.cn|yn\.cn|xz\.cn|sn\.cn|gs\.cn|qh\.cn|nx\.cn|xj\.cn|tw\.cn|hk\.cn|mo\.cn|cn|cx|cz|de|dk|fo|com\.ec|tm\.fr|com\.fr|asso\.fr|presse\.fr|fr|gf|gs|co\.il|net\.il|ac\.il|k12\.il|gov\.il|muni\.il|ac\.in|co\.in|org\.in|ernet\.in|gov\.in|net\.in|res\.in|is|it|ac\.jp|co\.jp|go\.jp|or\.jp|ne\.jp|ac\.kr|co\.kr|go\.kr|ne\.kr|nm\.kr|or\.kr|li|lt|lu|asso\.mc|tm\.mc|com\.mm|org\.mm|net\.mm|edu\.mm|gov\.mm|ms|nl|no|nu|pl|ro|org\.ro|store\.ro|tm\.ro|firm\.ro|www\.ro|arts\.ro|rec\.ro|info\.ro|nom\.ro|nt\.ro|se|si|com\.sg|org\.sg|net\.sg|gov\.sg|sk|st|tf|ac\.th|co\.th|go\.th|mi\.th|net\.th|or\.th|tm|to|com\.tr|edu\.tr|gov\.tr|k12\.tr|net\.tr|org\.tr|com\.tw|org\.tw|net\.tw|ac\.uk|uk\.com|uk\.net|gb\.com|gb\.net|vg|sh|kz|ch|info|ua|gov|name|pro|ie|hk|com\.hk|org\.hk|net\.hk|edu\.hk|us|tk|cd|by|ad|lv|eu\.lv|bz|es|jp|cl|ag|mobi|eu|co\.nz|org\.nz|net\.nz|maori\.nz|iwi\.nz|io|la|md|sc|sg|vc|tw|travel|my|se|tv|pt|com\.pt|edu\.pt|asia|fi|com\.ve|net\.ve|fi|org\.ve|web\.ve|info\.ve|co\.ve|tel|im|gr|ru|net\.ru|org\.ru|hr|com\.hr|ly|xyz)$/);

/*
function _i(arg: string, str: string): string | string[] {
    var sptr = arg.charAt(0),
        split = str.split(sptr);

    if (sptr === arg) { return split; }

    let arg2 = parseInt(arg.substring(1), 10);

    return split[arg2 < 0 ? split.length + arg2 : arg2 - 1];
}
*/

/*
function _d(s: string) {
  return decodeURIComponent(s.replace(/\+/g, ' '));
}

function _f(arg: string, str: string) {
    var sptr = arg.charAt(0),
        split = str.split('&'),
        field = [] as any[] | null,
        params = {} as any,
        tmp = [],
        arg2 = arg.substring(1);

    for (var i = 0, ii = split.length; i < ii; i++) {
        field = split[i].match(/(.*?)=(.*)/);

        // TODO: regex should be able to handle this.
        if ( ! field) {
            field = [split[i], split[i], ''];
        }

        if (field[1].replace(/\s/g, '') !== '') {
            field[2] = _d(field[2] || '');

            // If we have a match just return it right away.
            if (arg2 === field[1]) { return field[2]; }

            // Check for array pattern.
            tmp = field[1].match(/(.*)\[([0-9]+)\]/);

            if (tmp) {
                params[tmp[1]] = params[tmp[1]] || [];

                params[tmp[1]][tmp[2]] = field[2];
            }
            else {
                params[field[1]] = field[2];
            }
        }
    }

    if (sptr === arg) { return params; }

    return params[arg2];
}
*/

export function url(url: string/*, arg?: IUrlKeys*/): IUrlParts { //: IUrlResult | string | string[] | RegExp | undefined
    let rv: IUrlParts = {};
    let tmp;

    //if (arg === 'tld?') { return _t; }

    if (!url) { //!url - includes undefined and 0 length //url = url || ''; // tm: url = url || window.location.toString();
        return rv;
    }

    //if (!arg) { return url; }

    //arg = arg.toString() as IUrlKeys;

    if (tmp = url.match(/^mailto:([^\/].+)/)) {
        rv.protocol = 'mailto';
        rv.email = tmp[1];
    } else {
        // Ignore Hashbangs.
        if (tmp = url.match(/(.*?)\/#\!(.*)/)) {
            url = tmp[1] + tmp[2];
        }

        // Hash.
        if (tmp = url.match(/(.*?)#(.*)/)) {
            rv.hash = tmp[2];
            url = tmp[1];
        }

        // Return hash parts.
        //if (rv.hash && arg.match(/^#/)) { return _f(arg, rv.hash); }

        // Query
        if (tmp = url.match(/(.*?)\?(.*)/)) {
            rv.query = tmp[2];
            url = tmp[1];
        }

        // Return query parts.
        //if (rv.query && arg.match(/^\?/)) { return _f(arg, rv.query); }

        // Protocol.
        if (tmp = url.match(/(.*?)\:?\/\/(.*)/)) {
            rv.protocol = tmp[1].toLowerCase();
            url = tmp[2];
        }

        // Path.
        if (tmp = url.match(/(.*?)(\/.*)/)) {
            rv.path = tmp[2];
            url = tmp[1];
        }

        // Clean up path.
        rv.path = (rv.path || '').replace(/^([^\/])/, '/$1');

        // Return path parts.
        //if (arg.match(/^[\-0-9]+$/)) { arg = arg.replace(/^([^\/])/, '/$1') as IUrlKeys; }
        //if (arg.match(/^\//)) { return _i(arg, rv.path.substring(1)); }

        // File.
        /*
        tmp = _i('/-1', rv.path.substring(1));

        if (tmp && (tmp = (tmp as string).match(/(.*?)\.([^.]+)$/))) {
            rv.file = tmp[0];
            rv.filename = tmp[1];
            rv.fileext = tmp[2];
        }
        */

        // Port.
        if (tmp = url.match(/(.*)\:([0-9]+)$/)) {
            rv.port = tmp[2];
            url = tmp[1];
        }

        // Auth.
        if (tmp = url.match(/(.*?)@(.*)/)) {
            rv.auth = tmp[1];
            url = tmp[2];
        }

        // User and pass.
        if (rv.auth) {
            tmp = rv.auth.match(/(.*)\:(.*)/);
            rv.user = tmp ? tmp[1] : rv.auth;
            rv.pass = tmp ? tmp[2] : undefined;
        }

        // Hostname.
        rv.hostname = url.toLowerCase();

        // Return hostname parts.
        //if (arg.charAt(0) === '.') { return _i(arg, rv.hostname); }

        // Domain, tld and sub domain.
        if (tmp = rv.hostname.match(_t)) {
            rv.tld = tmp[3];
            rv.domain = tmp[2] ? tmp[2] + '.' + tmp[3] : undefined;
            rv.sub = tmp[1] || undefined;
        }

        rv.domainhost = rv.domain || rv.hostname;

        // Set port and protocol defaults if not set.
        //rv.port = rv.port || (rv.protocol === 'https' ? '443' : '80');
        //rv.protocol = rv.protocol || (rv.port === '443' ? 'https' : 'http');
    }

    return rv; //return arg ? rv[arg] : rv;

    // Return everything.
    //if (!arg) { return rv; }

    // Return arg.
    //if (arg in rv) { return rv[arg]; }
    //return rv[arg];

    // Default to undefined for no match.
    //return undefined;
}

//}//namespace tmurl
