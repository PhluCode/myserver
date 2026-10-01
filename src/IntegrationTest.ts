import { calculator } from './Calculator';

const integration_test = async () => {
    
    if (calculator.sum([1, 2, 3]) === 6) {
        console.log("Integration test 1 passed! (sum)");
    } else {
        console.log("Integration test 1 failed: expected 6 but got " + calculator.sum([1, 2, 3]));
        process.exit(1);
    }

    if (calculator.average([2, 4, 6]) === 4) {
        console.log("Integration test 2 passed! (average)");
    } else {
        console.log("Integration test 2 failed: expected 4 but got " + calculator.average([2, 4, 6]));
        process.exit(1);
    }
}

integration_test();