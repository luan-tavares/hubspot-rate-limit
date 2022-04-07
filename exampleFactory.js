const requestFactory = require("./src/requestFactory");
const getUri = require("./src/getUri");
const config = require("./config/config");
const queries = require("./src/getCompaniesQuery");

const request = requestFactory(getUri(queries));

request.getCompanies().then((response) => {
    console.log(response.data);
}).catch((error) => {
    console.error(`ERROR ${error.status}`);
    console.error(error.data || null);
});