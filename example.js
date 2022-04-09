const Request = require("./src/Request");
const getUri = require("./src/getUri");
const queries = require("./src/getCompaniesQuery");

const request = new Request(getUri(queries));

(async function () {
    try {
        const response = await request.getCompanies();
        console.log(response.data);
    } catch (error) {
        console.error(`ERROR ${error.status}`);
        console.log(error.data);
    }
})();