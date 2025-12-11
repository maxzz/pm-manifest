export namespace Poli {

    export enum ConstrainSet {      // former CharsetType
        alphanumeric,               // 0. alphabetic and numeric
        alpha,                      // 1. alphabetic
        numeric,                    // 2. numeric
        withspecial,                // 3. alphabetic, numeric and special characters
        atleastonenumber,           // 4. alphabetic, numeric and special characters with at least one number
    }

    export enum ConstrainPsw {      // former RESTRICTTYPE
        none,                       // 0. former none.         Nothing specified. former 'no_restrictions' // none,      // Nothing specified
        diffWp,                     // 1. former different_wp. Different from window password.             // notWinPsw, // Different from Windows password
        diffAp,                     // 2. former different_ap. Different from any password.                // notPmPsw,  // Unique within Password Manager logons // or from previous passwords // or Different from existing logins in the Password Manager.
        diffPp,                     // 3. former different_pp. Different from previous password.           // notCurPsw, // Different than the current password
    }

    export enum UseAs {             // former PolicyType
        none,                       // 0. none
        verify,                     // 1. TODO: describe; maybe as by user
        generate,                   // 2. TODO: describe; maybe as by system
    }

    export type Policy = {
        useAs: UseAs;               // Type of policy; former type; generate or verify
        constrainSet: ConstrainSet; // This is for simple policy only; former simpleChSet
        constrainPsw: ConstrainPsw; // Password repetition constrains
        minLen: number;             // min length of password
        maxLen: number;             // max length of password
        custom: string;             // Extended (custom rule) policy string; former policyExt
    };

} // namespace Poli

// For select options

export const nameValuesConstrainSet = [
    ["Letters and numbers", "0"],
    ["Letters only", "1"],
    ["Numbers only", "2"],
    ["Letters or numbers with special characters", "3"],
    ["Letters or numbers with at least one number", "4"],
] as const;

export const nameValuesConstrainPsw = [
    ["None", "0"],
    ["Different from Windows password", "1"],
    ["Unique within Password Manager logons", "2"],
    ["Different than the current password", "3"],
] as const;

export const nameValuesUseAs = [
    ["Verify", "1"],
    ["Generate", "2"],
] as const;

// default policy

const defaultPolicy: Poli.Policy = {
    useAs: Poli.UseAs.none,
    constrainSet: Poli.ConstrainSet.atleastonenumber,
    constrainPsw: Poli.ConstrainPsw.none,
    minLen: 0,
    maxLen: 0,
    custom: '',
};

export function defaultPolicyAs(useAs: Poli.UseAs): Poli.Policy {
    const rv = { ...defaultPolicy, useAs, constrains: Poli.ConstrainPsw.diffAp };
    switch (useAs) {
        case Poli.UseAs.none:
            break;
        case Poli.UseAs.verify:
            rv.minLen = 8;
            rv.maxLen = 32;
            break;
        case Poli.UseAs.generate:
            rv.minLen = 16;
            rv.maxLen = 16;
            break;
    }
    return rv;
}
