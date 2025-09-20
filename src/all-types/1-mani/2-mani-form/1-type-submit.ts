export const enum SUBMIT {
    dosubmit = 'dosubmit',
    nosubmit = 'nosubmit',
}

/*
    Form:
    namespace SUBMITTYPE {
        enum type_t {
            undefined = 0,		// For old manifests its undefined
            dosubmit,			// Force submit data, even if submit is not mutched or not detected
            nosubmit,			// Don't submit data. This is statement by User or Admin.
        };

        inline string_t toString(const SUBMITTYPE::type_t& v_) {
            const char* rv;
            switch (v_) {
                case SUBMITTYPE::undefined: rv = "undefined"; break;
                case SUBMITTYPE::dosubmit: rv = "dosubmit"; break;
                case SUBMITTYPE::nosubmit: rv = "nosubmit"; break;
                default: return sformat("NEW %d", (unsigned int)v_);
            }
            return rv;
        }
    }

    Field:
    class field_t {
        bool controltosubmitdata; // This is a former submit. This is mark of control to submit data, not a button mark how it was impropriety used everywhere.
    ...
    }

    bool is_controltosubmitdata() const
    {
        // The control is used to submit data only if both are true. It may be applied not only to button controls.
        // If controltosubmitdata is true it does not mean that it will be used to submit data.
        // Starting from Personal 3.0.0 (Pro 4.3) we are using combination useit and controltosubmitdata.
        // This combination may be applied to any control in theory, but so far we are going to use it for
        // edit and button controls only.
        //
        return controltosubmitdata && useit;
    }
*/
