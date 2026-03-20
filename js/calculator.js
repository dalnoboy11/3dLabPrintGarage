// Price calculator business logic
// Material price per gram (in UAH)
const MATERIAL_PRICES = {
    pla: 5,
    petg: 7,
    abs: 6,
    resin: 3,
};

const ELECTRICITY_RATE = 3; // UAH per hour
const BASE_FEE = 50; // UAH

function computePrice(weight, time, material) {
    const pricePerGram = MATERIAL_PRICES[material] || 0;
    const materialCost = weight * pricePerGram;
    const electricityCost = time * ELECTRICITY_RATE;
    const totalCost = materialCost + electricityCost + BASE_FEE;
    return Math.round(totalCost);
}

if (typeof module !== 'undefined') {
    module.exports = { computePrice, MATERIAL_PRICES, ELECTRICITY_RATE, BASE_FEE };
}
