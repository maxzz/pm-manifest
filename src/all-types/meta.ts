import { FieldTyp } from "./type-field-type";
import { Mani } from "./mani";
import { MPath } from "./mpath";
import { ValueLife } from "./type-value-life";

export module Meta {            // Manifest unpacked forms, as meta data

    export interface Path {     // Collection of path items (chunks)
        p4a?: MPath.p4a[];
        p4?: MPath.p4[];
        loc?: string;           // "x y w h | x y w h ... | x y w h"
        sid?: MPath.sid;
        did2?: string;
        sn?: MPath.sn;          // script number
    }

    export type Chunk = keyof Meta.Path; //type ChunkName = 'p4a' | 'p4' | 'loc' | 'sid' | 'did2' | 'sn';

    export interface Field {
        mani: Mani.Field,
        ftyp: FieldTyp,
        life: ValueLife;
        path: Path;
        pidx: number;           // index in the form
        ridx: number;           // for preview index in form.view.rects (or -1 if no found, but it should never happens if view exist)
    }

    export interface Disp {     // Display information about form
        domain?: string;        // Form website domain if website.
        isScript: boolean;      // Form has at least one script field.
        noFields: boolean;      // Form has no fields, i.e. excluded website.
        isIe: boolean;          // Form detection processname contains 'iexplore.exe' i.e. login was trained with IE as (manual or normal and this depends on isScript).
        bailOut?: string[];     // Manifest needs extra attention
    }

    export interface Bounds {
        x1: number;             // x1,y1 ┌──────┐
        y1: number;             //       │      │
        x2: number;             //       └──────┘ x2,y2
        y2: number;
    }

    export interface View {
        rects: MPath.loc[];
        bounds: Bounds;
    }

    export interface Form {
        mani: Mani.Form;
        type: number;           // 0 - login; 1 - password change
        disp: Disp;
        pool: string[];
        view?: View;            // view exists only for IE and win32
        fields: Field[];        // each item corresponds to each field
        rother: number[];       // array of ridx from another form, i.e for form.type 0 its rects indices of form.type 1, and vice versa
    }

} //module Meta