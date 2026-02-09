import * as cpp from "./1-cpp";
import * as xml from "./2-xml";
import * as low from "./3-low";
import * as esc from "./3-remove-escape-chars";

export const TransformEncoding = {
    ...cpp,
    ...xml,
    ...low,
    ...esc,
};

export * from "./4-swap-key-val-pairs"; // This is for keys/values mapping utilities; has nothing to do with pm-manifest.
