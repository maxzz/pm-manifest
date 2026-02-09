import { describe, expect, it } from 'vitest';
import { removeIllegal, restoreIllegal } from './3-low';

describe('removeIllegal', () => {
    it('should return empty string unchanged', () => {
        expect(removeIllegal('')).toBe('');
    });

    it('should return regular string unchanged', () => {
        expect(removeIllegal('hello world')).toBe('hello world');
    });

    it('should not encode null character (\\x00)', () => {
        expect(removeIllegal('\x00')).toBe('\x00');
    });

    it('should encode control characters \\x01-\\x1f', () => {
        expect(removeIllegal('\x01')).toBe('%01');
        expect(removeIllegal('\x0a')).toBe('%0a');
        expect(removeIllegal('\x0d')).toBe('%0d');
        expect(removeIllegal('\x1f')).toBe('%1f');
    });

    it('should encode tab (\\x09) and newline (\\x0a)', () => {
        expect(removeIllegal('\t')).toBe('%09');
        expect(removeIllegal('\n')).toBe('%0a');
        expect(removeIllegal('\r')).toBe('%0d');
    });

    it('should encode percent sign as %25', () => {
        expect(removeIllegal('%')).toBe('%25');
        expect(removeIllegal('100%')).toBe('100%25');
    });

    it('should not encode printable ASCII characters', () => {
        const printable = 'ABCDEFghijklmnop0123456789!@#$^&*()';
        expect(removeIllegal(printable)).toBe(printable);
    });

    it('should encode mixed content correctly', () => {
        expect(removeIllegal('hello\x01world')).toBe('hello%01world');
        expect(removeIllegal('a\tb\nc')).toBe('a%09b%0ac');
        expect(removeIllegal('50% off\nnow')).toBe('50%25 off%0anow');
    });

    it('should encode all control characters from \\x01 to \\x1f', () => {
        for (let i = 1; i <= 0x1f; i++) {
            const ch = String.fromCharCode(i);
            const hex = i.toString(16).padStart(2, '0');
            expect(removeIllegal(ch)).toBe(`%${hex}`);
        }
    });
});

describe('restoreIllegal', () => {
    it('should return empty string unchanged', () => {
        expect(restoreIllegal('')).toBe('');
    });

    it('should return regular string unchanged', () => {
        expect(restoreIllegal('hello world')).toBe('hello world');
    });

    it('should decode encoded control characters back', () => {
        expect(restoreIllegal('%01')).toBe('\x01');
        expect(restoreIllegal('%0a')).toBe('\x0a');
        expect(restoreIllegal('%0d')).toBe('\x0d');
        expect(restoreIllegal('%1f')).toBe('\x1f');
    });

    it('should decode uppercase hex digits', () => {
        expect(restoreIllegal('%0A')).toBe('\x0a');
        expect(restoreIllegal('%0D')).toBe('\x0d');
        expect(restoreIllegal('%1F')).toBe('\x1f');
    });

    it('should decode %25 back to percent sign', () => {
        expect(restoreIllegal('%25')).toBe('%');
        expect(restoreIllegal('100%25')).toBe('100%');
    });

    it('should NOT decode hex sequences for chars > 31 (except %)', () => {
        // %41 is 'A' (65), should stay as %41
        expect(restoreIllegal('%41')).toBe('%41');
        // %3a is ':' (58), should stay as %3a
        expect(restoreIllegal('%3a')).toBe('%3a');
        // %20 is space (32), should stay as %20
        expect(restoreIllegal('%20')).toBe('%20');
    });

    it('should decode mixed content correctly', () => {
        expect(restoreIllegal('hello%01world')).toBe('hello\x01world');
        expect(restoreIllegal('a%09b%0ac')).toBe('a\tb\nc');
    });

    it('should leave incomplete percent sequences unchanged', () => {
        expect(restoreIllegal('%')).toBe('%');
        expect(restoreIllegal('%0')).toBe('%0');
        expect(restoreIllegal('abc%')).toBe('abc%');
    });

    it('should leave non-hex characters after percent unchanged', () => {
        expect(restoreIllegal('%zz')).toBe('%zz');
        expect(restoreIllegal('%gg')).toBe('%gg');
    });
});

describe('roundtrip: removeIllegal <-> restoreIllegal', () => {
    it('should roundtrip regular strings', () => {
        const input = 'hello world';
        expect(restoreIllegal(removeIllegal(input))).toBe(input);
    });

    it('should roundtrip strings with control characters', () => {
        const input = 'line1\nline2\ttab\r\nend';
        expect(restoreIllegal(removeIllegal(input))).toBe(input);
    });

    it('should roundtrip strings with percent signs', () => {
        const input = '100% complete';
        expect(restoreIllegal(removeIllegal(input))).toBe(input);
    });

    it('should roundtrip all control characters', () => {
        for (let i = 1; i <= 0x1f; i++) {
            const ch = String.fromCharCode(i);
            expect(restoreIllegal(removeIllegal(ch))).toBe(ch);
        }
    });

    it('should roundtrip complex mixed content', () => {
        const input = 'user\x01name\x1f50% done\nnext line';
        expect(restoreIllegal(removeIllegal(input))).toBe(input);
    });

    it('should roundtrip empty string', () => {
        expect(restoreIllegal(removeIllegal(''))).toBe('');
    });
});
