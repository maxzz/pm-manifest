export var TimeUtils;
(function (TimeUtils) {
    function fileTimeToDate(fileTime) {
        /**
         * fileTimeToDate()
         * Convert a Windows FILETIME to a Javascript Date
         * @param {number} fileTime - the number of 100ns
         * intervals since January 1, 1601 (UTC)
         * @returns {Date}
         **/
        if (typeof fileTime === 'string') {
            fileTime = fileTime ? Number('0x' + fileTime.split(' ').join('')) : 0; // dwHighDateTime + ' ' + dwLowDateTime 
        }
        return !!fileTime ? new Date(fileTime / 10000 - 11644473600000) : new Date;
    }
    function filetimeFromDate(date) {
        return date.getTime() * 1e4 + 116444736000000000;
    }
    function dpTimeToShow(fileTime) {
        if (fileTime) {
            const d = fileTimeToDate(fileTime).toLocaleString();
            const m = /^(\d\d??)\/(\d\d??)\/(\d\d\d\d), (\d\d??):(\d\d??):(\d\d?)([\s\S]*$)/.exec(d);
            m && [1, 2, 4, 5, 6].forEach((idx) => m[idx] = zeros(m[idx], 2));
            return m ? `${m[1]}.${m[2]}.${m[3]} ${m[4]}:${m[5]}:${m[6]} ${m[7]}` : d;
        }
        return '';
    }
    TimeUtils.dpTimeToShow = dpTimeToShow;
    function zeros(v, total) {
        // Returns v prefixed with '0's with length <= total or v as is.
        v = v ? '' + v : '';
        return v.length < total ? '0000000000'.slice(0, total - v.length) + v : v;
    }
})(TimeUtils || (TimeUtils = {})); //namespace TimeUtils
