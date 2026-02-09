
// low characters from 1..31, and %, for choosevalue, names, value

const HEX = '0123456789abcdef';

export function removeIllegal(v: string): string {
    return v.replace(/[\x01-\x1f%]/g,
        (ch) => {
            const c = ch.charCodeAt(0);
            return '%' + HEX[(c >> 4) & 0xf] + HEX[c & 0xf];
        }
    );
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

export function restoreIllegal(v: string): string {
    return v.replace(/%([0-9a-fA-F]{2})/g,
        (match, hex) => {
            const b = parseInt(hex, 16);
            return (b <= 31 || b === 0x25) ? String.fromCharCode(b) : match; // 0x25 is '%'
        }
    );
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