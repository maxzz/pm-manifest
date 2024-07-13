import { EditorDataForDly, EditorDataForKbd, EditorDataForPos, KeyModifierNumbers, ScriptChunkEditorData, ScriptInFile } from "./9-types";

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

    export function toString(modifiers: modifiers_t): string {
        let rv = '';

        rv = buildMod(modifiers.shift, 's');
        rv += buildMod(modifiers.ctrl, 'c');
        rv += buildMod(modifiers.alt, 'a');

        return rv;
    }

    export function fromString(v_: string): modifiers_t {
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

    function modifierToNumber(mod: modifier_t): number {
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

    function numberToModifier(v: number): modifier_t {
        let rv: modifier_t = new modifier_t();

        switch (v) {
            case 1: rv.l = true; break;
            case 2: rv.r = true; break;
            case 3: rv.g = true; break;
        }

        return rv;
    }

    export function modifiersToNumbers(v: modifiers_t): KeyModifierNumbers {
        return {
            shift: modifierToNumber(v.shift),
            ctrl: modifierToNumber(v.ctrl),
            alt: modifierToNumber(v.alt),
        };
    }

    export function numbersToModifiers(v: KeyModifierNumbers): modifiers_t {
        return {
            shift: numberToModifier(v.shift),
            ctrl: numberToModifier(v.ctrl),
            alt: numberToModifier(v.alt),
        };
    }

} //namespace modifiers

function convertOptions(options: string[]): Record<string, string> {
    const rv: Record<string, string> = {};

    options.forEach((option: string) => {
        const [key, value] = option.split('=');
        rv[key] = value;
    });

    return rv;    
}

/**
 * @param chunkValue one of the following:
 *      * "keys,key=ins,repeat=20,mode=sca"
 *      * "field"
 *      * "pos,x=10,y=19"
 *      * "delay,ms=1000"
 */
export function parseChunk(chunkValue: string): ScriptChunkEditorData | undefined {
    const ss = chunkValue.split(',');
    const [key, ...rest] = ss;
    switch (key) {
        case 'keys':
            {
                const obj = convertOptions(rest) as ScriptInFile.Key;
                const mods = modifiers.fromString(obj.mode || '');
                const rep = +(obj.repeat || '0');
                const rv: EditorDataForKbd = {
                    type: 'kbd',
                    char: obj.key || '',
                    repeat: isNaN(rep) ? 0 : rep,
                    ...modifiers.modifiersToNumbers(mods),
                };
                return rv;
            }
        case 'field':
            return { type: 'fld', id: '' };
        case 'pos':
            {
                const obj = convertOptions(rest) as ScriptInFile.Pos;
                const x = +(obj.x || '0');
                const y = +(obj.y || '0');
                const rv: EditorDataForPos = {
                    type: 'pos',
                    x: isNaN(x) ? 0 : x,
                    y: isNaN(y) ? 0 : y,
                };
                return rv;
            }
        case 'delay':
            {
                const obj = convertOptions(rest) as ScriptInFile.Delay;
                const n = +(obj.ms || '0');
                const rv: EditorDataForDly = {
                    type: 'dly',
                    n: isNaN(n) ? 0 : n,
                };
                return rv;
            }
    }
}

export function parseChunks(chunks: string[]): ScriptChunkEditorData[] {
    return chunks.map(parseChunk).filter((chunk): chunk is ScriptChunkEditorData => !!chunk);
}

export function stringifyChunk(chunk: ScriptChunkEditorData): string {
    switch (chunk.type) {
        case 'kbd':
            {
                const mods = modifiers.toString(modifiers.numbersToModifiers(chunk));
                return `keys,key=${chunk.char},repeat=${chunk.repeat},mode=${mods}`;
            }
        case 'fld':
            return 'field';
        case 'pos':
            return `pos,x=${chunk.x},y=${chunk.y}`;
        case 'dly':
            return `delay,ms=${chunk.n}`;
    }
}

export function stringifyChunks(chunks: ScriptChunkEditorData[]): string[] {
    return chunks.map(stringifyChunk);
}
