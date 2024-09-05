export type AuthTokenValues = {
    value: number;
    name: string;
};

const authTokenValues: AuthTokenValues[] = [
    { value: 0x00001, name: "Password" },
    { value: 0x00002, name: "Fingerprints" },
    { value: 0x00004, name: "PKI Smart card" },
    { value: 0x00020, name: "Contactless Writable card" },

    { value: 0x00080, name: "PIN" },
    { value: 0x00800, name: "One-Time Password" },
    { value: 0x00100, name: "Proximity" },
    { value: 0x00200, name: "Bluetooth" },
    { value: 0x08000, name: "FIDO Key" },
    { value: 0x00010, name: "Face" },
];

// Authentication tokens (dpauthtokenids.h as DP_AUTH_TOKEN_XXX):
// The low-order word specifies the Authentication Tokens enabled in the policy. See Authentication Tokens supported.
// The high-order word specifies the relationship between Authentication Tokens. See Authentication Token relationships supported.

// All
//
// const enum AuthToken {
//     password        /**/ = 0x00001,     // Password based Authentication Token
//     fingerprint     /**/ = 0x00002,     // Fingerprint based Authentication Token
//     smartcard       /**/ = 0x00004,     // Smart Card based Authentication Token
//     sparekey        /**/ = 0x00008,     // HP Spare Key Authentication Token
//     face            /**/ = 0x00010,     // Face Recognition Authentication Token
//     contactless     /**/ = 0x00020,     // Contactless Card based Authentication Token
//     covery_pwd      /**/ = 0x00040,     // Windows user recovery password
//     pin             /**/ = 0x00080,     // PIN Auxiliary Token
//     proximity       /**/ = 0x00100,     // Proximity Card Auxiliary Token
//     bluetooth       /**/ = 0x00200,     // Bluetooth Auxiliary Token
//     palm            /**/ = 0x00400,     // Palm based Authentication Token
//     otp             /**/ = 0x00800,     // One Time Password based Authentication Token
//     rsa             /**/ = otp,         // OTP, RSA implementation
//     virt_smartcard  /**/ = 0x01000,     // Virtual Smart Card (TPM) based Authentication Token
//     wia             /**/ = 0x02000,     // Windows Integrated Authentication (WIA) Authentication Token
//     mail            /**/ = 0x04000,     // E-Mail Authentication Token
//     u2f             /**/ = 0x08000,     // FIDO Token
//     behavior        /**/ = 0x10000,     // Behavior Check Authentication Token
//     radius          /**/ = 0x20000,     // RADIUS Authentication Token
//     passkey         /**/ = 0x40000,     // Passkey Authentication Token
// }

// Currently used
//
// const enum AuthToken {
//     password        /**/ = 0x00001,     // Password based Authentication Token
//     fingerprint     /**/ = 0x00002,     // Fingerprint based Authentication Token
//     smartcard       /**/ = 0x00004,     // Smart Card based Authentication Token
//     contactless     /**/ = 0x00020,     // Contactless Card based Authentication Token

//     pin             /**/ = 0x00080,     // PIN Auxiliary Token
//     otp             /**/ = 0x00800,     // One Time Password based Authentication Token
//     proximity       /**/ = 0x00100,     // Proximity Card Auxiliary Token
//     bluetooth       /**/ = 0x00200,     // Bluetooth Auxiliary Token
//     u2f             /**/ = 0x08000,     // FIDO Token
//     face            /**/ = 0x00010,     // Face Recognition Authentication Token
// }

/*
tokens.push_back(SToken(IDI_ICON_PASSWORD,    rstring(IDS_PASSWORD_TOKEN).c_str(),        DP_AUTH_TOKEN_PASSWORD));
tokens.push_back(SToken(IDI_ICON_FINGERPRINT, rstring(IDS_FINGERPRINTS_TOKEN).c_str(),    DP_AUTH_TOKEN_FINGERPRINT));
tokens.push_back(SToken(IDI_ICON_SMARTCARD,   rstring(IDS_SMARTCARD_TOKEN).c_str(),       DP_AUTH_TOKEN_SMARTCARD));
tokens.push_back(SToken(IDI_ICON_CONTACTLESS, rstring(IDS_CONTACTLESSCARD_TOKEN).c_str(), DP_AUTH_TOKEN_CONTACTLESS));

tokens.push_back(SToken(IDI_ICON_PIN,		  rstring(IDS_PIN_TOKEN).c_str(),			  DP_AUTH_TOKEN_PIN));
tokens.push_back(SToken(IDI_ICON_OTP,         rstring(IDS_OTP_TOKEN).c_str(),             DP_AUTH_TOKEN_OTP));
tokens.push_back(SToken(IDI_ICON_PROXIMITY,   rstring(IDS_PROXIMITYCARD_TOKEN).c_str(),   DP_AUTH_TOKEN_PROXIMITY));
tokens.push_back(SToken(IDI_ICON_BLUETOOTH,   rstring(IDS_BLUETOOTH_TOKEN).c_str(),       DP_AUTH_TOKEN_BLUETOOTH));
tokens.push_back(SToken(IDI_ICON_FIDOKEY,     rstring(IDS_FIDOKEY_TOKEN).c_str(),         DP_AUTH_TOKEN_U2F));
tokens.push_back(SToken(IDI_ICON_FACE,        rstring(IDS_FACE_TOKEN).c_str(),            DP_AUTH_TOKEN_FACE));

IDS_PASSWORD_TOKEN      "Password"
IDS_FINGERPRINTS_TOKEN  "Fingerprints"
IDS_SMARTCARD_TOKEN     "PKI Smart card"
IDS_CONTACTLESSCARD_TOKEN "Contactless Writable card"

IDS_PIN_TOKEN           "PIN"
IDS_OTP_TOKEN           "One-Time Password"
IDS_PROXIMITYCARD_TOKEN "Contactless ID card"
IDS_BLUETOOTH_TOKEN     "Bluetooth"
IDS_FIDOKEY_TOKEN       "FIDO Key"
IDS_FACE_TOKEN          "Face"
*/
