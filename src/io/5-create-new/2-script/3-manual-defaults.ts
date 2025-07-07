import { type Mani } from "../../../all-types";
import { EditorDataForOne } from "../../../transforms";
import { createGuid } from "../../../utils";
import { createScriptItem_pos, createScriptItem_kbd, createScriptItem_fld, createScriptItem_dly } from "./0-all";

export function defaultManualFormFields(createCpass: boolean): Mani.Field[] {
    const rv: Mani.Field[] = createCpass ? cpassFields() : loginFields();
    return rv;
}

function loginFields(): Mani.Field[] {
    return [
        {
            displayname: "Username",
            type: "edit",
            dbname: createGuid(),
            path_ext: "[sn]2.0.pos,x=10,y=10,units=abs;keys,key=tab;field;",
            useit: true,
        },
        {
            displayname: "Password",
            type: "edit",
            password: true,
            dbname: createGuid(),
            path_ext: "[sn]2.1.delay,ms=100;keys,key=tab;field;",
            useit: true,
        },
    ];
}

function cpassFields(): Mani.Field[] {
    return [
        {
            displayname: "current password",
            type: "edit",
            password: true,
            dbname: createGuid(),
            path_ext: "[sn]3.0.pos,x=10,y=10,units=abs;keys,key=tab;field;",
            useit: true,
        },
        {
            displayname: "New password",
            type: "edit",
            password: true,
            dbname: createGuid(),
            path_ext: "[sn]3.1.delay,ms=100;keys,key=tab;field;",
            useit: true,
        },
        {
            displayname: "Confirm new password",
            type: "edit",
            password: true,
            dbname: createGuid(),
            path_ext: "[sn]3.2.delay,ms=100;keys,key=tab;field;keys,key=enter;",
            useit: true,
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
