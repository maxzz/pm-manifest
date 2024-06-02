export namespace Poli {

    export enum ConstrainSet {      // former CharsetType
        alphanumeric,		        // alphabetic and numeric
        alpha,				        // alphabetic
        numeric,			        // numeric
        withspecial,		        // alphabetic, numeric and special characters
        atleastonenumber,	        // alphabetic, numeric and special characters with at least one number
    }

    export enum ConstrainPsw {      // former RESTRICTTYPE
        none,                       // former none.         Nothing specified. former 'no_restrictions' // none,      // Nothing specified
        diffWp,                     // former different_wp. Different from window password.             // notWinPsw, // Different from Windows password
        diffAp,                     // former different_ap. Different from any password.                // notPmPsw,  // Unique within Password Manager logons
        diffPp,                     // former different_pp. Different from previous password.           // notCurPsw, // Different than the current password
    }

    export enum UseAs {             // former PolicyType
        none,
        verify,				        // TODO: describe; maybe as by user
        generate,			        // TODO: describe; maybe as by system
    }

    export type Policy = {
        useAs: UseAs;               // former type; generate or verify
        constrainSet: ConstrainSet; // former simpleChSet
        constrainPsw: ConstrainPsw;
        minLen: number;             // min password length
        maxLen: number;             // max password length
        useExt: boolean;            // ? use customRule
        custom: string;             // customRule former policyExt
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
