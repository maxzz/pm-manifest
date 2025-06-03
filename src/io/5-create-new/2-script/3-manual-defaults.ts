import { type Mani } from "../../../all-types";
import { createGuid } from "../../../utils";

export function defaultManualFormFields(): Mani.Field[] {
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
