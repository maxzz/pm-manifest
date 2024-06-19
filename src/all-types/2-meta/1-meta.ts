import { FieldTyp } from "../1-mani/1-mani-field/type-field-type";
import * as Mani from "../1-mani";
import * as  MPath from "./2-mpath";
import { ValueLife } from "../1-mani/1-mani-field/type-value-life";

//export module Meta {            // Manifest unpacked forms, as meta data

    export type Path = {        // Collection of path items (chunks)
        p4a?: MPath.p4a[];
        p4?: MPath.p4[];
        loc?: string;           // "x y w h | x y w h ... | x y w h"
        sid?: MPath.sid;
        did2?: string;
        sn?: MPath.sn;          // script number
    }

    export type Chunk = Prettify<keyof Path>; //type ChunkName = 'p4a' | 'p4' | 'loc' | 'sid' | 'did2' | 'sn';

    export type Field = {   
        mani: Mani.Field,
        ftyp: FieldTyp,
        life: ValueLife;
        path: Path;
        pidx: number;           // index in the form
        ridx: number;           // for preview index in form.view.rects (or -1 if no found, but it should never happens if view exist)
        uuid: number;           // short relative uuid number in the current session
    }

    export type Disp = {        // Display information about form
        domain?: string;        // Form website domain if website.
        isScript: boolean;      // Form has at least one script field.
        noFields: boolean;      // Form has no fields, i.e. excluded website.
        isIe: boolean;          // Form detection processname contains 'iexplore.exe' i.e. login was trained with IE as (manual or normal and this depends on isScript).
        bailOut?: string[];     // Manifest needs extra attention
    }

    export type Bounds = {  
        x1: number;             // x1,y1 ┌──────┐
        y1: number;             //       │      │
        x2: number;             //       └──────┘ x2,y2
        y2: number;
    }

    export type View = {    
        rects: MPath.loc[];
        bounds: Bounds;
    }

    export type Form = {    
        mani: Mani.Form;
        type: number;           // 0 - login; 1 - password change
        disp: Disp;
        pool: string[];
        view?: View;            // view exists only for IE and win32
        fields: Field[];        // each item corresponds to each field
        rother: number[];       // array of ridx from another form, i.e for form.type 0 its rects indices of form.type 1, and vice versa
        uuid: number;           // short relative uuid number in the current session
    }

//}
