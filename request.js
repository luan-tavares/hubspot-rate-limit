//const axios = require("axios");
const config = require("./config");
const getUri = require("./getUri");
const axios = require("./axios.mock");

const queries = {
    "limit": config.HUBSPOT_LIST_LIMIT,
    "offset": 0,
    "hapikey": config.API_KEY
};

const requestPromise = (function () {
    let tryCounter = 0;

    const handler = function (resolve, reject) {
        axios.get(getUri(queries)).then(function (response) {
            resolve(response);
        }).catch(function (error) {
            if (tryCounter >= config.CALL_TRY_LIMIT || error.response.data.errorType !== config.HUBSPOT_RATE_LIMIT_CODE) {
                reject(error.response);
                return;
            }
            tryCounter++;
            console.log(`Try ${tryCounter} ...`);
            setTimeout(() => {
                resolve(new Promise(handler));
            }, config.CALL_MILISECONDS_INTERVAL);
        });
    }

    return {
        call: function () {
            return new Promise(handler);
        }
    };
})();


module.exports = {
    getCompanies: function () {
        return requestPromise.call();
    }
}