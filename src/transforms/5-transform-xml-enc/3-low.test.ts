import { describe, expect, it } from 'vitest';
import { lowRemoveIllegal, lowRestoreIllegal } from './3-low';

describe('removeIllegal', () => {
    it('should return empty string unchanged', () => {
        expect(lowRemoveIllegal('')).toBe('');
    });

    it('should return regular string unchanged', () => {
        expect(lowRemoveIllegal('hello world')).toBe('hello world');
    });

    it('should not encode null character (\\x00)', () => {
        expect(lowRemoveIllegal('\x00')).toBe('\x00');
    });

    it('should encode control characters \\x01-\\x1f', () => {
        expect(lowRemoveIllegal('\x01')).toBe('%01');
        expect(lowRemoveIllegal('\x0a')).toBe('%0a');
        expect(lowRemoveIllegal('\x0d')).toBe('%0d');
        expect(lowRemoveIllegal('\x1f')).toBe('%1f');
    });

    it('should encode tab (\\x09) and newline (\\x0a)', () => {
        expect(lowRemoveIllegal('\t')).toBe('%09');
        expect(lowRemoveIllegal('\n')).toBe('%0a');
        expect(lowRemoveIllegal('\r')).toBe('%0d');
    });

    it('should encode percent sign as %25', () => {
        expect(lowRemoveIllegal('%')).toBe('%25');
        expect(lowRemoveIllegal('100%')).toBe('100%25');
    });

    it('should not encode printable ASCII characters', () => {
        const printable = 'ABCDEFghijklmnop0123456789!@#$^&*()';
        expect(lowRemoveIllegal(printable)).toBe(printable);
    });

    it('should encode mixed content correctly', () => {
        expect(lowRemoveIllegal('hello\x01world')).toBe('hello%01world');
        expect(lowRemoveIllegal('a\tb\nc')).toBe('a%09b%0ac');
        expect(lowRemoveIllegal('50% off\nnow')).toBe('50%25 off%0anow');
    });

    it('should encode all control characters from \\x01 to \\x1f', () => {
        for (let i = 1; i <= 0x1f; i++) {
            const ch = String.fromCharCode(i);
            const hex = i.toString(16).padStart(2, '0');
            expect(lowRemoveIllegal(ch)).toBe(`%${hex}`);
        }
    });
});

describe('restoreIllegal', () => {
    it('should return empty string unchanged', () => {
        expect(lowRestoreIllegal('')).toBe('');
    });

    it('should return regular string unchanged', () => {
        expect(lowRestoreIllegal('hello world')).toBe('hello world');
    });

    it('should decode encoded control characters back', () => {
        expect(lowRestoreIllegal('%01')).toBe('\x01');
        expect(lowRestoreIllegal('%0a')).toBe('\x0a');
        expect(lowRestoreIllegal('%0d')).toBe('\x0d');
        expect(lowRestoreIllegal('%1f')).toBe('\x1f');
    });

    it('should decode uppercase hex digits', () => {
        expect(lowRestoreIllegal('%0A')).toBe('\x0a');
        expect(lowRestoreIllegal('%0D')).toBe('\x0d');
        expect(lowRestoreIllegal('%1F')).toBe('\x1f');
    });

    it('should decode %25 back to percent sign', () => {
        expect(lowRestoreIllegal('%25')).toBe('%');
        expect(lowRestoreIllegal('100%25')).toBe('100%');
    });

    it('should NOT decode hex sequences for chars > 31 (except %)', () => {
        // %41 is 'A' (65), should stay as %41
        expect(lowRestoreIllegal('%41')).toBe('%41');
        // %3a is ':' (58), should stay as %3a
        expect(lowRestoreIllegal('%3a')).toBe('%3a');
        // %20 is space (32), should stay as %20
        expect(lowRestoreIllegal('%20')).toBe('%20');
    });

    it('should decode mixed content correctly', () => {
        expect(lowRestoreIllegal('hello%01world')).toBe('hello\x01world');
        expect(lowRestoreIllegal('a%09b%0ac')).toBe('a\tb\nc');
    });

    it('should leave incomplete percent sequences unchanged', () => {
        expect(lowRestoreIllegal('%')).toBe('%');
        expect(lowRestoreIllegal('%0')).toBe('%0');
        expect(lowRestoreIllegal('abc%')).toBe('abc%');
    });

    it('should leave non-hex characters after percent unchanged', () => {
        expect(lowRestoreIllegal('%zz')).toBe('%zz');
        expect(lowRestoreIllegal('%gg')).toBe('%gg');
    });
});

describe('roundtrip: removeIllegal <-> restoreIllegal', () => {
    it('should roundtrip regular strings', () => {
        const input = 'hello world';
        expect(lowRestoreIllegal(lowRemoveIllegal(input))).toBe(input);
    });

    it('should roundtrip strings with control characters', () => {
        const input = 'line1\nline2\ttab\r\nend';
        expect(lowRestoreIllegal(lowRemoveIllegal(input))).toBe(input);
    });

    it('should roundtrip strings with percent signs', () => {
        const input = '100% complete';
        expect(lowRestoreIllegal(lowRemoveIllegal(input))).toBe(input);
    });

    it('should roundtrip all control characters', () => {
        for (let i = 1; i <= 0x1f; i++) {
            const ch = String.fromCharCode(i);
            expect(lowRestoreIllegal(lowRemoveIllegal(ch))).toBe(ch);
        }
    });

    it('should roundtrip complex mixed content', () => {
        const input = 'user\x01name\x1f50% done\nnext line';
        expect(lowRestoreIllegal(lowRemoveIllegal(input))).toBe(input);
    });

    it('should roundtrip empty string', () => {
        expect(lowRestoreIllegal(lowRemoveIllegal(''))).toBe('');
    });
});
