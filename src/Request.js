const config = require("../config/config");
let axios = require("axios");
//axios = require("./axios.mock");

function Request(uri) {
    let tryCounter = 0;

    async function callRequest(resolve, reject) {
        try {
            const response = await axios.get(uri);
            resolve(response);
        } catch (error) {
            errorCatch(error, resolve, reject);
        }
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

    this.getCompanies = generatePromise;
}

module.exports = Request;