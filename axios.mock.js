const fs = require('fs');

const STATUS = 402;
const HUBSOT_ERROR_LIMIT_JSON = './error-limit.json';

function get(url) {
    let data;
    try {
        data = JSON.parse(fs.readFileSync(HUBSOT_ERROR_LIMIT_JSON, 'utf8'));
    } catch (err) {
        data = null;
    }

    const response = {
        status: STATUS,
        data
    }

    return new Promise(function (resolve, reject) {
        if (STATUS >= 200 && STATUS < 300) {
            resolve(response);
            return;
        }
        reject({
            response: response
        });
    });
}

module.exports = {
    get
};