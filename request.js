let axios = require("axios");
const config = require("./config");

axios = require("./axios.mock");

function getUri(query) {
    const queryEncode = Object.keys(query).map(key => `${key}=${query[key]}`).join('&');
    return `${config.HUBSPOT_LIST_COMPANY_BASE_URI}?${queryEncode}`;
}

function requestPromise(counter, uri) {
    return new Promise(function (resolve, reject) {
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
                resolve(requestPromise(counter, uri));
            }, config.CALL_MILISECONDS_INTERVAL);
        });
    });
}

const getCompanies = function (counter = 0) {
    const uri = getUri({
        "limit": config.HUBSPOT_LIST_LIMIT,
        "offset": 0,
        "hapikey": config.API_KEY
    });
    return requestPromise(counter, uri);
};

module.exports = {
    getCompanies
}