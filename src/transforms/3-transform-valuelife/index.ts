import { FieldTyp, Mani, ValueAs, ValueLife, fieldTyp4Str } from "../../all-types";

export namespace TransformValue {

    type valueLife4ManiLogicParams = {
        askalways?: boolean;
        onetvalue?: boolean;
        value?: string;

        password?: boolean;
        fType: FieldTyp; // mostly used for field catalog selection
    };

    export function valueLife4ManiLogic({ askalways, onetvalue, value, password, fType }: valueLife4ManiLogicParams): ValueLife {
        const rv: ValueLife = {
            valueAs:
                (!onetvalue && !askalways)
                    ? ValueAs.askReuse
                    : (!onetvalue && askalways)
                        ? ValueAs.askConfirm
                        : ValueAs.askAlways, // legal:(onetvalue && askalways) and illegal:(onetvalue && !askalways)
            ...(password && { isPsw: true }),
            value: '',
            isRef: false,
            //...(field.type !== 'edit' && field.type !== 'combo' && { isBtn: true }),
            fType: fType,
            isNon: false,
        };

        if (value) {
            rv.isRef = value?.charAt(0) === '@';
            rv.value = value?.replace(/^@/, '');
            rv.isRef = rv.isRef && !!rv.value && rv.value.charAt(0) !== '@'; // case for '@@'
        }

        return rv;
    }

    export type ValueLife4 = Pick<Mani.Field, 'askalways' | 'onetvalue' | 'value' | 'password' | 'type'>;   // Minimum fields for valueLife from manifest
    export type ValueLife4WoType = Omit<ValueLife4, 'type'>;                                                // Minimum fields for valueLife from catalog

    export function valueLife4Mani(field: ValueLife4): ValueLife {
        const { askalways, onetvalue, value, password } = field;
        return valueLife4ManiLogic({
            askalways,
            onetvalue,
            value,
            password,
            fType: fieldTyp4Str(field),
        });
    }

    export function valueLife4Catalog(item: ValueLife4WoType): ValueLife {
        const { askalways, onetvalue, value, password } = item;
        const fType = item.password ? FieldTyp.psw : FieldTyp.edit;
        return valueLife4ManiLogic({
            askalways,
            onetvalue,
            value,
            password,
            fType,
        });
    }

    export type valueLife2ManiLogicReturn = { // as part of Mani.Field | CatalogItem
        askalways?: boolean;
        onetvalue?: boolean;
        value?: string;
    };

    function valueLife2ManiLogic(vl: ValueLife, rv: valueLife2ManiLogicReturn): void {
        const { valueAs: va } = vl;

        va === ValueAs.askReuse
            ? (rv.onetvalue = undefined, rv.askalways = undefined)
            : va === ValueAs.askConfirm
                ? (rv.onetvalue = undefined, rv.askalways = true)
                : (rv.onetvalue = true, rv.askalways = true);

        vl.value
            ? (rv.value = `${vl.isRef ? '@' : (vl.value.charAt(0) === '@' ? '@' : '')}${vl.value}`)
            : (delete rv.value);
    }

    export function valueLife2Mani(vl: ValueLife, rv: valueLife2ManiLogicReturn): void {
        valueLife2ManiLogic(vl, rv);
    }

} //namespace TransformValue

//TODO: skip writting '=== undefined' values
