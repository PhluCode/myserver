const BASE_URL = 'http://localhost:3000';

const integration_test = async () => {
    const res = await fetch(BASE_URL + '/')

    if (res.status === 200) {
        console.log("Integration test 1 passed!");
    } else {
        console.log("Integration test 1  failed: Expected 200 but got " + res.status);
        process.exit(1);
    }

    const test = await res.text();
    if (test === 'HelloWorld!') {
        console.log("Integration test 2 passed!");
    } else {
        console.log("Integration test 2 failed: Expected 'Hello, World!' but got " + test);
        process.exit(1);
    }
}

integration_test().catch((err) => {
    console.error("Integration test failed with error: ", err);
    process.exit(1);
});