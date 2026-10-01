import { utils } from './Utils';

function sum(numbers: number[]): number {
    let total = 0;
    for (const n of numbers) {
        total = utils.add(total, n);
    }
    return total;
}

function average(numbers: number[]): number {
    return sum(numbers) / numbers.length;
}

export const calculator = {
    sum,
    average
}