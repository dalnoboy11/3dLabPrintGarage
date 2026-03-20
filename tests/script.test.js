const { calculate } = require('../js/script');

describe('calculate', () => {
    describe('basic arithmetic', () => {
        test('evaluates addition', () => {
            expect(calculate('2+3')).toBe(5);
        });

        test('evaluates subtraction', () => {
            expect(calculate('10-4')).toBe(6);
        });

        test('evaluates multiplication', () => {
            expect(calculate('3*4')).toBe(12);
        });

        test('evaluates division', () => {
            expect(calculate('10/4')).toBe(2.5);
        });

        test('evaluates parenthesized expression', () => {
            expect(calculate('(2+3)*4')).toBe(20);
        });

        test('evaluates nested parentheses', () => {
            expect(calculate('((2+3)*2)+10')).toBe(20);
        });

        test('evaluates decimal numbers', () => {
            expect(calculate('1.5+2.5')).toBe(4);
        });

        test('handles whitespace in expression', () => {
            expect(calculate('2 + 3')).toBe(5);
        });
    });

    describe('security — rejects non-arithmetic input', () => {
        test('returns Error for alphabetic characters', () => {
            expect(calculate('alert("xss")')).toBe('Error');
        });

        test('returns Error for code injection via process', () => {
            expect(calculate('process.exit()')).toBe('Error');
        });

        test('returns Error for backtick template literals', () => {
            expect(calculate('`hello`')).toBe('Error');
        });

        test('returns Error for square brackets', () => {
            expect(calculate('[1,2]')).toBe('Error');
        });

        test('returns Error for curly braces', () => {
            expect(calculate('{}')).toBe('Error');
        });

        test('returns Error for semicolons', () => {
            expect(calculate('1;2')).toBe('Error');
        });
    });

    describe('error handling', () => {
        test('returns Error for incomplete expression', () => {
            expect(calculate('2+')).toBe('Error');
        });

        test('returns Infinity for division by zero', () => {
            // 1/0 in JS returns Infinity, not an error — verify it doesn't throw
            expect(calculate('1/0')).toBe(Infinity);
        });

        test('returns Error for empty string', () => {
            expect(calculate('')).toBe('Error');
        });
    });
});
