const RequestPromise = require("./RequestPromise");
const getUri = require("./getUri");
const config = require("./config");


const queries = {
    "limit": config.HUBSPOT_LIST_LIMIT,
    "offset": 0,
    "hapikey": config.API_KEY
};

const request = new RequestPromise(getUri(queries));


(async function () {
    try {
        const c = await request.call();
        console.log(c.data);
    } catch (error) {
        console.error(`ERROR ${error.status}`);
        console.log(error.data);
    }
})();