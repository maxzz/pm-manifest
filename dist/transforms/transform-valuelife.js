import { FieldTyp, fieldTyp4Str } from "../mani-types";
export var TransformValue;
(function (TransformValue) {
    function valueLife4ManiLogic({ askalways, onetvalue, value, password, fType }) {
        const vl = {
            valueAs: (!onetvalue && !askalways)
                ? 0 /* ValueAs.askReuse */
                : (!onetvalue && askalways)
                    ? 1 /* ValueAs.askConfirm */
                    : 2 /* ValueAs.askAlways */,
            ...(password && { isPsw: true }),
            //...(field.type !== 'edit' && field.type !== 'combo' && { isBtn: true }),
            fType: fType,
        };
        if (value) {
            vl.isRef = value?.charAt(0) === '@';
            vl.value = value?.replace(/^@/, '');
            vl.isRef = vl.isRef && !!vl.value && vl.value.charAt(0) !== '@'; // case for '@@'
        }
        return vl;
    }
    TransformValue.valueLife4ManiLogic = valueLife4ManiLogic;
    function valueLife4Mani(field) {
        const { askalways, onetvalue, value, password } = field;
        return valueLife4ManiLogic({ askalways, onetvalue, value, password, fType: fieldTyp4Str(field) });
    }
    TransformValue.valueLife4Mani = valueLife4Mani;
    function valueLife4Catalog(item) {
        const { askalways, onetvalue, value, password } = item;
        const fType = item.password ? FieldTyp.psw : FieldTyp.edit;
        return valueLife4ManiLogic({ askalways, onetvalue, value, password, fType });
    }
    TransformValue.valueLife4Catalog = valueLife4Catalog;
    function valueLife2ManiLogic(vl, rv) {
        const { valueAs: va } = vl;
        va === 0 /* ValueAs.askReuse */
            ? (rv.onetvalue = undefined, rv.askalways = undefined)
            : va === 1 /* ValueAs.askConfirm */
                ? (rv.onetvalue = undefined, rv.askalways = true)
                : (rv.onetvalue = true, rv.askalways = true);
        vl.value ? (rv.value = `${vl.isRef ? '@' : (vl.value.charAt(0) === '@' ? '@' : '')}${vl.value}`) : (delete rv.value);
    }
    TransformValue.valueLife2ManiLogic = valueLife2ManiLogic;
    function valueLife2Mani(vl, rv) {
        valueLife2ManiLogic(vl, rv);
    }
    TransformValue.valueLife2Mani = valueLife2Mani;
})(TransformValue || (TransformValue = {})); //namespace TransformValue
//TODO: skip recording of '=== undefined' values
