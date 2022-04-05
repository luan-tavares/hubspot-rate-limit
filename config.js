require('dotenv').config();

const config = {
    API_KEY: process.env.HUBSPOT_API_KEY,
    HUBSPOT_LIST_LIMIT: 5,
    HUBSPOT_LIST_COMPANY_BASE_URI: "https://api.hubapi.com/companies/v2/companies/paged",
    HUBSPOT_RATE_LIMIT_CODE: "RATE_LIMIT",
    CALL_TRY_LIMIT: 3,
    CALL_MILISECONDS_INTERVAL: 500,
};

module.exports = config;