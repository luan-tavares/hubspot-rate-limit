//const axios = require("axios");
const config = require("./config");
const getUri = require("./getUri");
const axios = require("./axios.mock");

const queries = {
    "limit": config.HUBSPOT_LIST_LIMIT,
    "offset": 0,
    "hapikey": config.API_KEY
};

const requestPromise = (function (uri) {
    let counter = 0;
    const handler = function (resolve, reject) {
        axios.get(uri).then(function (response) {
            resolve(response);
        }).catch(function (error) {
            if (counter >= config.CALL_TRY_LIMIT || error.response.data.errorType !== config.HUBSPOT_RATE_LIMIT_CODE) {
                reject(error.response);
                return;
            }
            counter++;
            console.log(`Try ${counter} ...`);
            setTimeout(() => {
                resolve(new Promise(handler));
            }, config.CALL_MILISECONDS_INTERVAL);
        });
    }
    return function () {
        return new Promise(handler);
    };
})(getUri(queries));


module.exports = {
    getCompanies: function () {
        return requestPromise();
    }
}