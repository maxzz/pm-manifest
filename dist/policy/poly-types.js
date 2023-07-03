export var ConstrainSet;
(function (ConstrainSet) {
    ConstrainSet[ConstrainSet["alphanumeric"] = 0] = "alphanumeric";
    ConstrainSet[ConstrainSet["alpha"] = 1] = "alpha";
    ConstrainSet[ConstrainSet["numeric"] = 2] = "numeric";
    ConstrainSet[ConstrainSet["withspecial"] = 3] = "withspecial";
    ConstrainSet[ConstrainSet["atleastonenumber"] = 4] = "atleastonenumber";
})(ConstrainSet || (ConstrainSet = {}));
export var ConstrainPsw;
(function (ConstrainPsw) {
    ConstrainPsw[ConstrainPsw["none"] = 0] = "none";
    ConstrainPsw[ConstrainPsw["diffWp"] = 1] = "diffWp";
    ConstrainPsw[ConstrainPsw["diffAp"] = 2] = "diffAp";
    ConstrainPsw[ConstrainPsw["diffPp"] = 3] = "diffPp";
})(ConstrainPsw || (ConstrainPsw = {}));
export var UseAs;
(function (UseAs) {
    UseAs[UseAs["none"] = 0] = "none";
    UseAs[UseAs["verify"] = 1] = "verify";
    UseAs[UseAs["generate"] = 2] = "generate";
})(UseAs || (UseAs = {}));
export const namesConstrainSet = [
    "Letters and numbers",
    "Numbers only",
    "Letters only",
    "Letters or numbers with special characters",
    "Letters or numbers with at least one number",
];
export const namesConstrainPsw = [
    "None",
    "Different than the Windows password",
    "Unique within Password Manager logons",
    "Different than the current password",
];
export const namesUseAs = [
    "Verify",
    "Generate",
];
