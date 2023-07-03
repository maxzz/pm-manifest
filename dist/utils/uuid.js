export const startTime = Date.now();
function now() {
    const timeNow = Date.now();
    const last = now.last || timeNow;
    return now.last = timeNow > last ? timeNow : last + 1;
}
function asNumber() {
    return now();
}
function asRelativeNumber() {
    return now() - startTime;
}
export function uuid(short) {
    let n = now();
    if (short) {
        n -= startTime;
    }
    return n.toString(36);
}
uuid.asNumber = asNumber;
uuid.asRelativeNumber = asRelativeNumber;
