export namespace Poli {

    export enum ConstrainSet {      // former CharsetType
        alphanumeric,               // alphabetic and numeric
        alpha,                      // alphabetic
        numeric,                    // numeric
        withspecial,                // alphabetic, numeric and special characters
        atleastonenumber,           // alphabetic, numeric and special characters with at least one number
    }

    export enum ConstrainPsw {      // former RESTRICTTYPE
        none,                       // former none.         Nothing specified. former 'no_restrictions' // none,      // Nothing specified
        diffWp,                     // former different_wp. Different from window password.             // notWinPsw, // Different from Windows password
        diffAp,                     // former different_ap. Different from any password.                // notPmPsw,  // Unique within Password Manager logons // or from previous passwords // or Different from existing logins in the Password Manager.
        diffPp,                     // former different_pp. Different from previous password.           // notCurPsw, // Different than the current password
    }

    export enum UseAs {             // former PolicyType
        none,
        verify,                     // TODO: describe; maybe as by user
        generate,                   // TODO: describe; maybe as by system
    }

    export type Policy = {
        useAs: UseAs;               // Type of policy; former type; generate or verify
        constrainSet: ConstrainSet; // This is for simple policy only; former simpleChSet
        constrainPsw: ConstrainPsw; // Password repetition constrains
        minLen: number;             // min length of password
        maxLen: number;             // max length of password
      //useExt: boolean;            // Is extended (custom rule) policy in effective now? This is not in manifest, but in c++.
        custom: string;             // Extended (custom rule) policy string; former policyExt
    };

} // namespace Poli

export const namesConstrainSet = [
    "Letters and numbers",
    "Numbers only",
    "Letters only",
    "Letters or numbers with special characters",
    "Letters or numbers with at least one number",
];

export const namesConstrainPsw = [
    "None",
    "Different from Windows password",
    "Unique within Password Manager logons",
    "Different than the current password",
];

export const namesUseAs = [
    "Verify",
    "Generate",
];

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
