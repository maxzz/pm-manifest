
// low characters from 1..31, and %, for choosevalue, names, value

export function removeIllegal(v: string): string {
    let rv = '';

    for (let i = 0; i < v.length; i++) {
        const charCode = v.charCodeAt(i);
        // if ((unsigned(*it) <= 31 && *it != 0) || *it == '%')
        if ((charCode <= 31 && charCode !== 0) || charCode === 37) { // 37 is '%'
            rv += '%' + charCode.toString(16).padStart(2, '0').toLowerCase();
        } else {
            rv += v[i];
        }
    }

    return rv;
}

/*
namespace low			//low characters from 1..31, and %, for choosevalue, names, value
{
    inline string_t remove_illegal(__in const string_t& v_)
    {
        string_t rv; rv.reserve(v_.size());

        for (string_t::const_iterator it=v_.begin(); it!=v_.end(); ++it)
        {
            if ((unsigned(*it) <= 31 && *it != 0) || *it == '%')
            {
                rv += sformat("%%%02x", unsigned(*it));
            }
            else
            {
                rv += *it;
            }
        }//for

        return rv;
    } //remove_illegal()

} //namespace low
*/

function xdigit2hex(v: number): number {
    if (v >= 48 && v <= 57) { // 0-9
        return v - 48;
    }
    // a-f (97-102) or A-F (65-70)
    // tolower: v | 32
    return (10 + (v | 32) - 97) & 0x0f;
}

export function restoreIllegal(v: string): string {
    let rv = '';
    let i = 0;
    while (i < v.length) {
        if (v[i] === '%') {
            i++;
            if (i >= v.length) break;

            const hb = xdigit2hex(v.charCodeAt(i));

            i++;
            if (i >= v.length) break;

            const lb = xdigit2hex(v.charCodeAt(i));

            const b = (hb << 4) | lb;

            // if (b <= 31 || b == '%')
            if (b <= 31 || b === 37) { // 37 is '%'
                rv += String.fromCharCode(b);
            } else {
                rv += '%' + b.toString(16).padStart(2, '0').toLowerCase();
            }
        } else {
            rv += v[i];
        }
        i++;
    }
    return rv;
}

/*
namespace low			//low characters from 1..31, and %, for choosevalue, names, value
{
    inline int xdigit2hex(__in char v_)
    {
        return (isdigit(v_) ? v_ - '0' : 10 + tolower(v_) - 'a') & 0x0f;

    } //xdigit2hex()

    inline string_t restore_illegal(__in const string_t& v_)
    {
        string_t rv; rv.reserve(v_.size());

        string_t::const_iterator it = v_.begin();
        while (it != v_.end())
        {
            if (*it == '%')
            {
                ++it;
                if (it == v_.end())
                    break;

                int hb = xdigit2hex(*it);

                ++it;
                if (it == v_.end())
                    break;

                int lb = xdigit2hex(*it);

                int b = (hb << 4) | lb;

                // The correct version is without this check, but we pack only lowest chars
                // ( in remove_illegal() ), then we need to restore only lowest chars
                // otherwise it will couse the problem (for example we'll
                // change %3a to ':' and then do for uppack::cpp(':'))
                //
                if (b <= 31 || b == '%')
                {
                    rv += char(b);
                }
                else
                {
                    rv += sformat("%%%02x", unsigned(b));
                }
            }
            else
                rv += *it;
            ++it;
        }//while
        return rv;
    } //restore_illegal()

} //namespace low

*/