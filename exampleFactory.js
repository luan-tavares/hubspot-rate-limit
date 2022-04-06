const requestFactory = require("./src/requestFactory");
const getUri = require("./src/getUri");
const config = require("./config/config");

const queries = {
    "limit": config.HUBSPOT_LIST_LIMIT,
    "offset": 0,
    "hapikey": config.API_KEY
};

const request = requestFactory(getUri(queries));

request.getCompanies().then((response) => {
    console.log(response.data);
}).catch((error) => {
    console.error(`ERROR ${error.status}`);
    console.error(error.data || null);
});