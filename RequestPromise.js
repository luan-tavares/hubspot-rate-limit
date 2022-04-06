const axios = require("./axios.mock");
const config = require("./config");
//const axios = require("axios");

function RequestPromise(uri) {
    let tryCounter = 0;

    function callRequest(resolve, reject) {
        axios.get(uri).then(function (response) {
            resolve(response);
        }).catch(function (error) {
            errorCatch(error, resolve, reject);
        });
    }

    function canTryAgain(error) {
        if (tryCounter >= config.CALL_TRY_LIMIT) {
            return false;
        }
        if (error.response.data.errorType !== config.HUBSPOT_RATE_LIMIT_CODE) {
            return false;
        }
        return true;
    }

    function errorCatch(error, resolve, reject) {
        if (!canTryAgain(error)) {
            reject(error.response);
            return;
        }
        tryCounter++;
        console.log(`Try ${tryCounter} ...`);
        setTimeout(() => {
            resolve(generatePromise());
        }, config.CALL_MILISECONDS_INTERVAL);
        return;
    }

    function generatePromise() {
        return new Promise(callRequest);
    }

    this.call = generatePromise;
}

module.exports = RequestPromise;