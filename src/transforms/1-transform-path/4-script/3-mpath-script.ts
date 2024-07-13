export type SnPartsKey = "keys" | "delay" | "field" | "pos"; // Script key inside sn.parts (dpcorescript/script_io.h.lines_io::cast_lines())

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

export * from "./4-mpath-script-keys";
