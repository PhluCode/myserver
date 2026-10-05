import assert from "node:assert/strict";
import { utils } from "./Utils";

const unit_test = async (): Promise<void> => {
    assert.equal(utils.isValidEmail("user@example.com"), true);
    assert.equal(utils.isValidEmail(" user@example.com "), true);

    for (const email of ["", "user", "user@", "@example.com", "user@example", "user name@example.com"]) {
        assert.equal(utils.isValidEmail(email), false, `Expected ${JSON.stringify(email)} to be invalid`);
    }

    for (const email of [null, undefined, 123, {}, false]) {
        assert.equal(utils.isValidEmail(email), false);
    }

    for (const age of [0, 18, 120]) {
        assert.equal(utils.isValidAge(age), true);
    }

    for (const age of [-1, 1.5, NaN, Infinity, -Infinity, "18", null, undefined, {}, false]) {
        assert.equal(utils.isValidAge(age), false);
    }

    for (const password of ["abc123", "pass1word", "P@ssw0rd", "a1b2c3"]) {
        assert.equal(utils.isValidPassword(password), true, `Expected ${JSON.stringify(password)} to be valid`);
    }

    for (const password of ["", "abc12", "abcdef", "123456", "ab1", "      ", null, undefined, 123456, {}]) {
        assert.equal(utils.isValidPassword(password), false, `Expected ${JSON.stringify(password)} to be invalid`);
    }

    console.log("All unit tests passed!");
};

unit_test().catch((error: unknown) => {
    console.error("Unit test failed:", error);
    process.exitCode = 1;
});
