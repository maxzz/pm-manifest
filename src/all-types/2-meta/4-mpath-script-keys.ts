export const actionKeys: string[] = [
    'Tab',
    'Enter',
    'Esc',
    'Left arrow',
    'Right arrow',
    'Up arrow',
    'Down arrow',
    'Page Up',
    'Page Down',
    'Home',
    'End',
    'Ins',
    'Del',
    'Backspace',
    'Spacebar',
    'Shift / Control / Alt',
    'F1',
    'F2',
    'F3',
    'F4',
    'F5',
    'F6',
    'F7',
    'F8',
    'F9',
    'F10',
    'F11',
    'F12',
];

export type SelectItemText = string | readonly [label: string, value: string];

export const modifierKeys: SelectItemText[] = [
    ['None', '0'],
    ['Any', '3'],
    ['Left', '1'],
    ['Right', '2'],
];

export function modifierToNumber(mod: modifiers.modifier_t): number {
    if (mod.g) {
        return 3;
    }

    if (mod.l) {
        return 1;
    }

    if (mod.r) {
        return 2;
    }

    return 0;
}

export function numberToModifier(v: number): modifiers.modifier_t {
    let rv: modifiers.modifier_t = new modifiers.modifier_t();

    switch (v) {
        case 1: rv.l = true; break;
        case 2: rv.r = true; break;
        case 3: rv.g = true; break;
    }

    return rv;
}

export namespace modifiers {

    export class modifier_t {
        g: boolean = false; //generic
        l: boolean = false; //left
        r: boolean = false; //right

        initFrom(modifier: modifier_t) {
            this.g = modifier.g;
            this.l = modifier.l;
            this.r = modifier.r;
        }

        clear() {
            this.g = false;
            this.l = false;
            this.r = false;
        }
    };

    class modifiers_t {
        shift: modifier_t = new modifier_t();
        ctrl: modifier_t = new modifier_t();
        alt: modifier_t = new modifier_t();
    };

    function buildMod(modifier: modifier_t, name: string): string {
        let rv = '';

        if (modifier.g) {
            return name;
        }

        if (modifier.l) rv += 'l';
        if (modifier.r) rv += 'r';

        if (modifier.l || modifier.r) {
            rv += name;
        }

        return rv;
    }

    export function buildToString(modifiers: modifiers_t): string {
        let rv = '';

        rv = buildMod(modifiers.shift, 's');
        rv += buildMod(modifiers.ctrl, 'c');
        rv += buildMod(modifiers.alt, 'a');

        return rv;
    }

    export function buildFromString(v_: string): modifiers_t {
        let rv: modifiers_t = new modifiers_t();
        let mod: modifier_t = new modifier_t();

        v_.split('').forEach(
            (currentchar: string) => {
                switch (currentchar) {
                    case 'l': mod.l = true; break;
                    case 'r': mod.r = true; break;
                    case 's': if (!mod.l && !mod.r) mod.g = true; rv.shift.initFrom(mod); mod.clear(); break;
                    case 'c': if (!mod.l && !mod.r) mod.g = true; rv.ctrl.initFrom(mod); mod.clear(); break;
                    case 'a': if (!mod.l && !mod.r) mod.g = true; rv.alt.initFrom(mod); mod.clear(); break;
                }
            }
        );
        return rv;
    }

} //namespace modifiers

export type ActionKeys = {
    key: string;
    modifiers: string;
};
