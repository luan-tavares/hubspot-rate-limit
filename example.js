const Request = require("./src/Request");
const getUri = require("./src/getUri");
const config = require("./config/config");

const queries = {
    "limit": config.HUBSPOT_LIST_LIMIT,
    "offset": 0,
    "hapikey": config.API_KEY
};

const request = new Request(getUri(queries));

(async function () {
    try {
        const c = await request.getCompanies();
        console.log(c.data);
    } catch (error) {
        console.error(`ERROR ${error.status}`);
        console.log(error.data);
    }
})();