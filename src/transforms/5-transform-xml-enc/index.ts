import * as cpp from "./1-cpp";
import * as xml from "./2-xml";
import * as esc from "./3-remove-escape-chars";

export const TransformEncoding = {
    ...cpp,
    ...xml,
    ...esc,
};
