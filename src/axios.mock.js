const fs = require('fs');
const path = require('path');

const STATUS = 402;
const HUBSOT_ERROR_LIMIT_JSON = '../config/error-limit.json';

function get() {
    const fullPath = path.resolve(__dirname, HUBSOT_ERROR_LIMIT_JSON);
    let data;
    try {
        data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
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