import { MSAA_ROLE } from "./2-constants-roles";
import { getStateEntries } from "./4-get-state-entries";

export type RoleStateNames = {
    raw: string;                    // this is backup in case if we cannot detect role or state
    role?: string | undefined;
    states?: string[] | undefined;
};

export function getRoleStateNames(roleString: string | undefined): RoleStateNames | undefined {
    if (!roleString) {
        return;
    }

    const rv: RoleStateNames = {
        raw: roleString,
    }

    const parts = roleString.split('_');
    if (parts[0] && !parts[1]) { // sometimes we have something like '2a_'.
        parts[1] = '0';
    }
    if (!parts[0] || !parts[1]) {
        return rv;
    }

    const roleNum = parseInt(parts[0], 16);
    if (Number.isNaN(roleNum)) {
        return rv;
    }

    rv.role = MSAA_ROLE[roleNum];
    rv.states = getStateEntries(parts[1]);

    return rv;
}
