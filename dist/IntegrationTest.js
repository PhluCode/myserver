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
const BASE_URL = 'http://localhost:3000';
const integration_test = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(BASE_URL + '/');
    if (res.status === 200) {
        console.log("Integration test 1 passed!");
    }
    else {
        console.log("Integration test 1  failed: Expected 200 but got " + res.status);
        process.exit(1);
    }
    const test = yield res.text();
    if (test === 'Hello, World!') {
        console.log("Integration test 2 passed!");
    }
    else {
        console.log("Integration test 2 failed: Expected 'Hello, World!' but got " + test);
        process.exit(1);
    }
});
integration_test().catch((err) => {
    console.error("Integration test failed with error: ", err);
    process.exit(1);
});
