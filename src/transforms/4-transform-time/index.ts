export namespace TimeUtils {

    /**
     * Convert a Windows FILETIME to a Javascript Date
     * @param {number} fileTime - 
     *                 - (1) number: the number of 100ns intervals since January 1, 1601 (UTC)
     *                 - (2) string: "1d43331 1aaabb19" as strored in manifest
     *                 - (3) string: empty string
     * @returns {Date}
     *                 - (1) converted filetime as Date
     *                 - (2) converted "1d43331 1aaabb19" as Date
     *                 - (3) new Date now as that can be converted to string as "Mon Sep 23 2024 14:23:59 GMT-0700 (Pacific Daylight Time)"
     **/
    export function fileTimeToDate(fileTime?: number | string): Date {

        if (typeof fileTime === 'string') {    // dwHighDateTime + ' ' + dwLowDateTime
            fileTime =
                fileTime                       // not empty string
                    ? Number('0x' + fileTime.split(' ').join(''))
                    : 0;
        }

        return (
            !!fileTime
                ? new Date(fileTime / 10000 - 11644473600000)
                : new Date
        );
    }

    export function dateToFileTime(date: Date): number {
        return date.getTime() * 1e4 + 116444736000000000;
    }

    /**
     * Convert a Windows FILETIME or manifest string to UI string
     * @param {number} fileTime -
     *                 - (1) number: the number of 100ns intervals since January 1, 1601 (UTC)
     *                 - (2) string: "1d43331 1aaabb19" as strored in manifest
     *                 - (3) string: empty or undefined string
     * @returns {string} "09.23.2024 02:33:31 PM" or "" string
     **/
    export function dpTimeToShow(fileTime?: number | string): string {
        if (!fileTime) {
            return '';
        }

        const d = fileTimeToDate(fileTime).toLocaleString();
        const m = /^(\d\d??)\/(\d\d??)\/(\d\d\d\d), (\d\d??):(\d\d??):(\d\d?)([\s\S]*$)/.exec(d);

        m && [1, 2, 4, 5, 6].forEach(
            (idx) => m[idx] = m[idx].padStart(2, '0')
        );

        return (
            m
                ? `${m[1]}.${m[2]}.${m[3]} ${m[4]}:${m[5]}:${m[6]}${m[7]}`
                : d
        );
    }

    /**
     * Return current time in format "1db0e05 51610620" as stored in manifest
     * @returns {string} "1db0e05 51610620"
     */
    export function timeNowAsDpTime(): string {
        const hex = TimeUtils.dateToFileTime(new Date()).toString(16);
        const second = hex.length - 8;
        return `${hex.slice(0, second)} ${hex.slice(second)}`; // second is 8 chars from the end
    }
}

/** /
const now = TimeUtils.dateToFileTime(new Date());
const hex = now.toString(16);
const str = hex.slice(0, 7) + ' ' + hex.slice(7);
console.log(`now: ${now}, hex: ${hex}, str: ${str} ui: "${TimeUtils.dpTimeToShow(str)}"`); // now: 133716029940500000, hex: 1db0e0551610620, str: 1db0e05 51610620 ui: "09.23.2024 03:09:54 PM"

console.log(`1: "${TimeUtils.dpTimeToShow("1d43331 1aaabb19")}"`);                    // "08.13.2018 11:11:49 AM"
console.log(`2: "${TimeUtils.dpTimeToShow(TimeUtils.dateToFileTime(new Date()))}"`);  // "09.23.2024 02:33:31 PM"
console.log(`3: "${TimeUtils.fileTimeToDate("1d43331 1aaabb19")}"`);                  // "Mon Aug 13 2018 11:11:49 GMT-0700 (Pacific Daylight Time)"
console.log(`4: "${TimeUtils.fileTimeToDate()}"`);                                    // "Mon Sep 23 2024 14:33:31 GMT-0700 (Pacific Daylight Time)"
/**/
