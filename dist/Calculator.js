"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculator = void 0;
const Utils_1 = require("./Utils");
function sum(numbers) {
    let total = 0;
    for (const n of numbers) {
        total = Utils_1.utils.add(total, n);
    }
    return total;
}
function average(numbers) {
    return sum(numbers) / numbers.length;
}
exports.calculator = {
    sum,
    average
};
