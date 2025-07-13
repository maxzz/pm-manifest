import { type Mani } from "../../../all-types";
import { type EditorDataForOne } from "../../../transforms";
import { createGuid } from "../../../utils";
import { createScriptItem_pos, createScriptItem_kbd, createScriptItem_fld, createScriptItem_dly } from "./0-all";

export function defaultManualFormFields(createCpass: boolean): Mani.Field[] {
    const formIdx = createCpass ? 1 : 0;
    const rv: Mani.Field[] = createCpass ? cpassFields(formIdx) : loginFields(formIdx);
    return rv;
}

function loginFields(formIdx: number): Mani.Field[] {
    const guids = [createGuid(), createGuid()];
    return [
        {
            displayname: "Username",
            type: "edit",
            dbname: guids[0],
            path_ext: "[sn]2.0.pos,x=10,y=10,units=abs;keys,key=tab;field;",
            useit: true,
            memOnly: newMemOnly(formIdx, guids[0]),
        },
        {
            displayname: "Password",
            type: "edit",
            password: true,
            dbname: guids[1],
            path_ext: "[sn]2.1.delay,ms=100;keys,key=tab;field;",
            useit: true,
            memOnly: newMemOnly(formIdx, guids[1]),
        },
    ];
}

function cpassFields(formIdx: number): Mani.Field[] {
    const guids = [createGuid(), createGuid(), createGuid()];
    return [
        {
            displayname: "current password",
            type: "edit",
            password: true,
            dbname: guids[0],
            path_ext: "[sn]3.0.pos,x=10,y=10,units=abs;keys,key=tab;field;",
            useit: true,
            memOnly: newMemOnly(formIdx, guids[0]),
        },
        {
            displayname: "New password",
            type: "edit",
            password: true,
            dbname: guids[1],
            path_ext: "[sn]3.1.delay,ms=100;keys,key=tab;field;",
            useit: true,
            memOnly: newMemOnly(formIdx, guids[1]),
        },
        {
            displayname: "Confirm new password",
            type: "edit",
            password: true,
            dbname: guids[2],
            path_ext: "[sn]3.2.delay,ms=100;keys,key=tab;field;keys,key=enter;",
            useit: true,
            memOnly: newMemOnly(formIdx, guids[2]),
        },
    ];
}

function newMemOnly(formIdx: number, dbname: string): Mani.MemOnly['memOnly'] {
    return { formIdx, uuidThis: 0, uuidLoginFld: 0, dbnameInitial: dbname, };
}

export function loginEditorData(): EditorDataForOne[] {
    return [
        createScriptItem_pos({ x: 10, y: 10 }),
        createScriptItem_kbd({ char: 'tab' }),
        createScriptItem_fld({ formIdx: 0, password: false, name: 'Username' }),
        createScriptItem_dly({ n: 100 }),
        createScriptItem_kbd({ char: 'tab' }),
        createScriptItem_fld({ formIdx: 0, password: true, name: 'Password' }),
    ];
}

export function cpassEditorData(): EditorDataForOne[] {
    return [
        createScriptItem_pos({ x: 10, y: 10 }),
        createScriptItem_kbd({ char: 'tab' }),
        createScriptItem_fld({ formIdx: 1, password: true, name: 'Current password' }),

        createScriptItem_dly({ n: 100 }),
        createScriptItem_kbd({ char: 'tab' }),
        createScriptItem_fld({ formIdx: 1, password: true, name: 'New password' }),

        createScriptItem_dly({ n: 100 }),
        createScriptItem_kbd({ char: 'tab' }),
        createScriptItem_fld({ formIdx: 1, password: true, name: 'Confirm new password' }),

        createScriptItem_dly({ n: 100 }),
        createScriptItem_kbd({ char: 'enter' }),
    ];
}
