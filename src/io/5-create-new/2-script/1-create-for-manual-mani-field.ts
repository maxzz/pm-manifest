import { type Mani } from "../../../all-types";
import { createGuidWrapped } from "../../../utils";

export function createForManualManiField(password: boolean, name: string): Mani.Field {
    const rv: Mani.Field = {
        type: "edit",
        password,
        useit: true,
        displayname: name,
        dbname: createGuidWrapped(),
    };
    return rv;
}
