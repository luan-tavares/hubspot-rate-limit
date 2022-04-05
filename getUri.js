const config = require("./config");

module.exports = function (query) {
    const queryEncode = Object.keys(query).map(key => `${key}=${query[key]}`).join('&');
    return `${config.HUBSPOT_LIST_COMPANY_BASE_URI}?${queryEncode}`;
};