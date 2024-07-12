export type p4a = {         // Chunk: p4a (from: unpack_fromstring())
    rnumber: number;
    roleString: string;
    className: string;
    name?: string;
};

export type p4 = p4a;       // Chunk: p4

export type sid = {         // Chunk: sid
    version: string;
    generatedId: string;
    formName: string;
    formAttrs?: string;
    outerHtml?: string;
};

export type did2 = {        // Chunk: did2
    s1: string;
    s2: string;
    s3: string;
    s4?: string;
};

export type loc = {         // Chunk: loc (size is in client area or against 1920x1200 or 1600x1200?)
    x: number;
    y: number;
    w: number;
    h: number;
    f?: number;             // 0 | 1 if the last element in field (this is internal and not saved).
    i?: number;             // index of rect before dedupe (this is internal and not saved).
};

// void cast_lineperfields(const wstring_t& lineperfield_, const wstring_t& lineperfield_field_, lineperfields_t& lineperfields_)
// Format: ['[sn]'<script line>]*
//    lineperfield_={"[sn]3.0.keys,key=ins,repeat=20,mode=sca;pos,x=10,y=19;field;delay,ms=1000"}
//    lineperfield_field_={"label=User name,type=txt,dbname={db151434-60dc-4a42-8dd7-5080dd747c83},value=,life=reuse"}
//


// lineperfield_t cast_line_lineperfields(const wstring_t& in)
// Format: #a'.'#b'.'<script parts> where: #a is count of patrs; #b is patr number (starting from 0)
//    in={"3.0.keys,key=ins,repeat=20,mode=sca;pos,x=10,y=19;field;delay,ms=1000"}
//    rv={parts=3 npart=0 script={"keys,key=ins,repeat=20,mode=sca;pos,x=10,y=19;field;delay,ms=1000"} scriptfield={""}}

export type SnPartsKey = "keys" | "delay" | "field" | "pos"; // Script key inside sn.parts (dpcorescript/script_io.h.lines_io::cast_lines())

export type sn = {          // Chunk: sn
    total: number;          // total blocks
    current: number;        // current block
    parts: string[];        // Block parts
};

// Block parts:
//      ['keys,key=home', 'field']
//      ['keys,key=home', 'delay,ms=1000', 'keys,key=tab', 'field']
//      ['keys,key=tab', 'keys,key=home', 'keys,key=tab,repeat=3', 'field']
