"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Calculator_1 = require("./Calculator");
const integration_test = () => __awaiter(void 0, void 0, void 0, function* () {
    if (Calculator_1.calculator.sum([1, 2, 3]) === 6) {
        console.log("Integration test 1 passed! (sum)");
    }
    else {
        console.log("Integration test 1 failed: expected 6 but got " + Calculator_1.calculator.sum([1, 2, 3]));
        process.exit(1);
    }
    if (Calculator_1.calculator.average([2, 4, 6]) === 4) {
        console.log("Integration test 2 passed! (average)");
    }
    else {
        console.log("Integration test 2 failed: expected 4 but got " + Calculator_1.calculator.average([2, 4, 6]));
        process.exit(1);
    }
});
integration_test();
