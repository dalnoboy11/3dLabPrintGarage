const { computePrice, MATERIAL_PRICES, ELECTRICITY_RATE, BASE_FEE } = require('../js/calculator');

describe('computePrice', () => {
    describe('base fee', () => {
        test('includes base fee when weight and time are 0', () => {
            expect(computePrice(0, 0, 'pla')).toBe(BASE_FEE);
        });
    });

    describe('material costs', () => {
        test('calculates PLA cost correctly', () => {
            // 100g * 5 UAH/g + 50 base = 550
            expect(computePrice(100, 0, 'pla')).toBe(100 * MATERIAL_PRICES.pla + BASE_FEE);
        });

        test('calculates PETG cost correctly', () => {
            // 100g * 7 UAH/g + 50 base = 750
            expect(computePrice(100, 0, 'petg')).toBe(100 * MATERIAL_PRICES.petg + BASE_FEE);
        });

        test('calculates ABS cost correctly', () => {
            // 100g * 6 UAH/g + 50 base = 650
            expect(computePrice(100, 0, 'abs')).toBe(100 * MATERIAL_PRICES.abs + BASE_FEE);
        });

        test('calculates Resin cost correctly', () => {
            // 100g * 3 UAH/g = 300 material cost, + 50 base = 350
            expect(computePrice(100, 0, 'resin')).toBe(100 * MATERIAL_PRICES.resin + BASE_FEE);
        });

        test('treats unknown material as 0 UAH/g', () => {
            expect(computePrice(100, 0, 'unknown')).toBe(BASE_FEE);
        });

        test('treats missing material as 0 UAH/g', () => {
            expect(computePrice(100, 0, '')).toBe(BASE_FEE);
        });
    });

    describe('electricity cost', () => {
        test('calculates electricity cost correctly', () => {
            // 0g material, 10h * 3 UAH/h + 50 base = 80
            expect(computePrice(0, 10, 'pla')).toBe(10 * ELECTRICITY_RATE + BASE_FEE);
        });

        test('electricity cost is zero when time is 0', () => {
            expect(computePrice(0, 0, 'abs')).toBe(BASE_FEE);
        });
    });

    describe('combined costs', () => {
        test('sums material and electricity costs with base fee', () => {
            // 50g PLA * 5 + 5h * 3 + 50 = 250 + 15 + 50 = 315
            expect(computePrice(50, 5, 'pla')).toBe(315);
        });

        test('handles large values correctly', () => {
            // 1000g PETG * 7 + 24h * 3 + 50 = 7000 + 72 + 50 = 7122
            expect(computePrice(1000, 24, 'petg')).toBe(7122);
        });
    });

    describe('rounding', () => {
        test('rounds fractional totals to nearest integer', () => {
            // 1.5g PLA * 5 + 50 = 7.5 + 50 = 57.5 -> 58
            expect(computePrice(1.5, 0, 'pla')).toBe(58);
        });

        test('rounds down when fraction is below 0.5', () => {
            // 1.4g * 5 = 7.0, + 50 = 57.0
            expect(computePrice(1.4, 0, 'pla')).toBe(57);
        });
    });

    describe('edge cases', () => {
        test('returns base fee when all inputs are zero', () => {
            expect(computePrice(0, 0, 'pla')).toBe(BASE_FEE);
        });

        test('handles fractional hours', () => {
            // 0g, 0.5h * 3 = 1.5, + 50 = 51.5 -> 52
            expect(computePrice(0, 0.5, 'pla')).toBe(52);
        });
    });
});
