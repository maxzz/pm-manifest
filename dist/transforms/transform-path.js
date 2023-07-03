import { TransformEncoding } from "./transform-xml-enc";
import { getPoolName } from "./transform-mani-pool";
export var FieldPath;
(function (FieldPath) {
    function p4a(pool, s) {
        let ss = s.split('.');
        let rv = {
            rnumber: 0,
            roleString: getPoolName(pool, ss[1]),
            className: TransformEncoding.cppRestore(getPoolName(pool, ss[2])),
            name: TransformEncoding.cppRestore(getPoolName(pool, ss[3]))
        };
        return rv;
    }
    function sid(pool, v) {
        let sid = {};
        v.split('.').forEach((_, index) => {
            let s = TransformEncoding.cppRestore(getPoolName(pool, _));
            switch (index) {
                case 0:
                    sid.version = s;
                    break;
                case 1:
                    sid.generatedId = s;
                    break;
                case 2:
                    sid.formName = s;
                    break;
                case 3:
                    sid.formAttrs = s;
                    break;
                case 4:
                    sid.outerHtml = s;
                    break;
                default: sid[index] = s;
            }
        });
        return sid;
    }
    let loc;
    (function (loc_1) {
        function unPool(pool, v) {
            return (v.split('|').map(idx => getPoolName(pool, idx)));
        }
        loc_1.unPool = unPool;
        function str2loc(v) {
            let [x, y, x2, y2] = v.split(' ').map(str => +str);
            return { x, y, w: x2 - x, h: y2 - y };
        }
        function loc2str(loc) {
            return `${loc.x} ${loc.y} ${loc.x + loc.w} ${loc.y + loc.h}`;
        }
        let utils;
        (function (utils) {
            function rectsBoundaries(rects) {
                let x1 = Number.MAX_SAFE_INTEGER;
                let y1 = Number.MAX_SAFE_INTEGER;
                let x2 = 0;
                let y2 = 0;
                rects.forEach(({ x, y, w, h }) => {
                    if (x1 > x) {
                        x1 = x;
                    }
                    if (y1 > y) {
                        y1 = y;
                    }
                    if (x2 < x + w) {
                        x2 = x + w;
                    }
                    if (y2 < y + h) {
                        y2 = y + h;
                    }
                });
                return { x1, y1, x2, y2 };
            }
            utils.rectsBoundaries = rectsBoundaries;
            function buildPreviewData(fields) {
                let uniqueLocs = new Set();
                fields.forEach((field) => {
                    const fieldLocs = (field.path.loc || '').split('|');
                    fieldLocs.forEach(loc => uniqueLocs.add(loc));
                    field.ridx = fieldLocs[fieldLocs.length - 1]; // temp store string as number
                });
                let rects = Array.from(uniqueLocs).map(str2loc).filter(loc => loc.w || loc.h);
                let bounds = rectsBoundaries(rects);
                const rectStrs = rects.map(loc2str);
                fields.forEach((field) => {
                    field.ridx = rectStrs.findIndex((locStr) => locStr === field.ridx); // restore str to number
                    rects[field.ridx] && (rects[field.ridx].f = 1);
                });
                return { rects, bounds, };
            }
            utils.buildPreviewData = buildPreviewData;
        })(utils = loc_1.utils || (loc_1.utils = {})); //namespace utils
    })(loc = FieldPath.loc || (FieldPath.loc = {})); //namespace loc
    function getChunks(path) {
        // [p4a]0.0.1.|0.2.1.[loc]b|c[sid]14.15.16..17 -> ['p4a', '0.0.1.|0.2.1.'], ['loc', 'b|c'], ['sid', '14.15.16..17']
        return path.split('[').filter(Boolean).map((val) => val.split(']'));
        ;
    }
    function fieldPathItems(pool, path) {
        const rv = {};
        const chunks = getChunks(path);
        chunks.forEach(([chunkName, chunkValue]) => {
            switch (chunkName) {
                case 'p4a':
                case 'p4': {
                    rv.p4a = chunkValue.split('|').map(_ => p4a(pool, _));
                    break;
                }
                case 'loc': {
                    rv.loc = loc.unPool(pool, chunkValue).join('|');
                    break;
                }
                case 'sid': {
                    rv.sid = sid(pool, chunkValue);
                    break;
                }
                case 'did2': {
                    rv.did2 = chunkValue;
                    break;
                }
                case 'sn': {
                    rv.sn = {
                        total: 0,
                        current: 0,
                        parts: [],
                    };
                    let ss = chunkValue.split(';');
                    if (ss.length) {
                        let first = ss[0].split('.'); // '3.0.the-rest'
                        if (first.length > 2) {
                            rv.sn.total = +first[0];
                            rv.sn.current = +first[1];
                            ss[0] = first[2];
                        }
                        rv.sn.parts = ss.filter(Boolean);
                    }
                    break;
                }
                default: {
                    console.log('??????path??????');
                }
            }
        });
        return rv;
    }
    FieldPath.fieldPathItems = fieldPathItems;
})(FieldPath || (FieldPath = {})); //namespace FieldPath
