import { type Mani } from "../../../all-types";
import { createGuid } from "../../../utils";

export function defaultManualFormFields(): Mani.Field[] {
    return [
        {
            displayname: "Username",
            type: "edit",
            dbname: createGuid(),
            path_ext: "[sn]2.0.field;",
            useit: true,
        },
        {
            displayname: "Password",
            type: "edit",
            password: true,
            dbname: createGuid(),
            path_ext: "[sn]2.1.field;",
            useit: true,
        },
    ];
}
