export type SnPartsKey = "keys" | "delay" | "field" | "pos"; // Script key inside sn.parts (dpcorescript/script_io.h.lines_io::cast_lines())

export type sn = {          // Chunk: sn. Format: ['[sn]'<script line>]*
    total: number;          // total blocks
    current: number;        // current block
    parts: string[];        // Block parts
};

/*
void cast_lineperfields(const wstring_t& lineperfield_, const wstring_t& lineperfield_field_, lineperfields_t& lineperfields_)
Format: ['[sn]'<script line>]*
    lineperfield_={"[sn]3.0.keys,key=ins,repeat=20,mode=sca;pos,x=10,y=19;field;delay,ms=1000"}
    lineperfield_field_={"label=User name,type=txt,dbname={db151434-60dc-4a42-8dd7-5080dd747c83},value=,life=reuse"}


lineperfield_t cast_line_lineperfields(const wstring_t& in)
Format: #a'.'#b'.'<script parts> where: #a is count of patrs; #b is patr number (starting from 0)
    in={"3.0.keys,key=ins,repeat=20,mode=sca;pos,x=10,y=19;field;delay,ms=1000"}
    rv={parts=3 npart=0 script={"keys,key=ins,repeat=20,mode=sca;pos,x=10,y=19;field;delay,ms=1000"} scriptfield={""}}

Block parts:
     ['keys,key=home', 'field']
     ['keys,key=home', 'delay,ms=1000', 'keys,key=tab', 'field']
     ['keys,key=tab', 'keys,key=home', 'keys,key=tab,repeat=3', 'field']
*/

export namespace modifiers {

    class modifier_t {
        g: boolean = false; //generic
        l: boolean = false; //left
        r: boolean = false; //right

        initFrom(modifier: modifier_t) {
            this.g = modifier.g;
            this.l = modifier.l;
            this.r = modifier.r;
        }

        clear() {
            this.g = false;
            this.l = false;
            this.r = false;
        }
    };

    class modifiers_t {
        shift: modifier_t = new modifier_t();
        ctrl: modifier_t = new modifier_t();
        alt: modifier_t = new modifier_t();
    };

    function buildMod(modifier: modifier_t, name: string): string {
        let rv = '';

        if (modifier.g) {
            return name;
        }

        if (modifier.l) rv += 'l';
        if (modifier.r) rv += 'r';

        if (modifier.l || modifier.r) {
            rv += name;
        }

        return rv;
    }

    export function buildToString(modifiers: modifiers_t): string {
        let rv = '';

        rv = buildMod(modifiers.shift, 's');
        rv += buildMod(modifiers.ctrl, 'c');
        rv += buildMod(modifiers.alt, 'a');

        return rv;
    }

    export function buildFromString(v_: string): modifiers_t {
        let rv: modifiers_t = new modifiers_t();
        let mod: modifier_t = new modifier_t();

        v_.split('').forEach(
            (currentchar: string) => {
                switch (currentchar) {
                    case 'l': mod.l = true; break;
                    case 'r': mod.r = true; break;
                    case 's': if (!mod.l && !mod.r) mod.g = true; rv.shift.initFrom(mod); mod.clear(); break;
                    case 'c': if (!mod.l && !mod.r) mod.g = true; rv.ctrl.initFrom(mod); mod.clear(); break;
                    case 'a': if (!mod.l && !mod.r) mod.g = true; rv.alt.initFrom(mod); mod.clear(); break;
                }
            }
        );
        return rv;
    }

} //namespace modifiers
