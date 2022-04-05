const api = require("./request");

// fetchApi().then((response) => {
//     console.log(response.data);
// }).catch((error) => {
//     console.error(`ERROR ${error.status}`);
//     console.error(error.data || null);
// });

(async function () {
    let result;
    try {
        result = await api.getCompanies();
    } catch (error) {
        console.error(`ERROR ${error.status}`);
        result = error;
    }
    console.log(result.data);
})();