import { type Mani } from "../../../all-types";
import { EditorDataForOne } from "../../../transforms";
import { createGuid } from "../../../utils";
import { createScriptItem_pos, createScriptItem_kbd, createScriptItem_fld, createScriptItem_dly } from "./0-all";

export function defaultManualFormFields(createCpass: boolean): Mani.Field[] {
    const rv: Mani.Field[] = createCpass ? cpassFields() : loginFields();
    return rv;
}

function loginFields(): Mani.Field[] {
    const guids = [createGuid(), createGuid()];
    return [
        {
            displayname: "Username",
            type: "edit",
            dbname: guids[0],
            path_ext: "[sn]2.0.pos,x=10,y=10,units=abs;keys,key=tab;field;",
            useit: true,
            memOnly: { uuidloginFld: 0, dbnameInitial: guids[0], },
        },
        {
            displayname: "Password",
            type: "edit",
            password: true,
            dbname: guids[1],
            path_ext: "[sn]2.1.delay,ms=100;keys,key=tab;field;",
            useit: true,
            memOnly: { uuidloginFld: 0, dbnameInitial: guids[1], },
        },
    ];
}

function cpassFields(): Mani.Field[] {
    const guids = [createGuid(), createGuid(), createGuid()];
    return [
        {
            displayname: "current password",
            type: "edit",
            password: true,
            dbname: guids[0],
            path_ext: "[sn]3.0.pos,x=10,y=10,units=abs;keys,key=tab;field;",
            useit: true,
            memOnly: { uuidloginFld: 0, dbnameInitial: guids[0], },
        },
        {
            displayname: "New password",
            type: "edit",
            password: true,
            dbname: guids[1],
            path_ext: "[sn]3.1.delay,ms=100;keys,key=tab;field;",
            useit: true,
            memOnly: { uuidloginFld: 0, dbnameInitial: guids[1], },
        },
        {
            displayname: "Confirm new password",
            type: "edit",
            password: true,
            dbname: guids[2],
            path_ext: "[sn]3.2.delay,ms=100;keys,key=tab;field;keys,key=enter;",
            useit: true,
            memOnly: { uuidloginFld: 0, dbnameInitial: guids[2], },
        },
    ];
}

export function loginEditorData(): EditorDataForOne[] {
    return [
        createScriptItem_pos({ x: 10, y: 10 }),
        createScriptItem_kbd({ char: 'tab' }),
        createScriptItem_fld({ password: false, name: 'Username' }),
        createScriptItem_dly({ n: 100 }),
        createScriptItem_kbd({ char: 'tab' }),
        createScriptItem_fld({ password: true, name: 'Password' }),
    ];
}

export function cpassEditorData(): EditorDataForOne[] {
    return [
        createScriptItem_pos({ x: 10, y: 10 }),
        createScriptItem_kbd({ char: 'tab' }),
        createScriptItem_fld({ password: true, name: 'Current password' }),

        createScriptItem_dly({ n: 100 }),
        createScriptItem_kbd({ char: 'tab' }),
        createScriptItem_fld({ password: true, name: 'New password' }),

        createScriptItem_dly({ n: 100 }),
        createScriptItem_kbd({ char: 'tab' }),
        createScriptItem_fld({ password: true, name: 'Confirm new password' }),

        createScriptItem_dly({ n: 100 }),
        createScriptItem_kbd({ char: 'enter' }),
    ];
}
