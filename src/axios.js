const fs = require('fs');
const path = require('path');
const axios = require('axios');
const config = require("../config/config");

const axiosMock = function () {
    const STATUS = 402;
    const HUBSOT_ERROR_LIMIT_JSON = '../config/error-limit.json';
    const MAX_TIMEOUT = 600;
    const MIN_TIMEOUT = 100;
    const fullPath = path.resolve(__dirname, HUBSOT_ERROR_LIMIT_JSON);

    function getMicroseconds() {
        return Math.floor(Math.random() * (MAX_TIMEOUT - MIN_TIMEOUT)) + MIN_TIMEOUT;
    }

    function get() {

        let data = null;

        let promiseObject = {};

        try {
            data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
        } catch (err) {

        }

        const response = {
            status: STATUS,
            data
        }

        function setTimeoutHandler() {
            if (STATUS >= 200 && STATUS < 300) {
                promiseObject.resolve(response);
                return;
            }
            promiseObject.reject({
                response: response
            });
        };

        return new Promise(function (resolve, reject) {
            promiseObject.resolve = resolve;
            promiseObject.reject = reject;
            setTimeout(setTimeoutHandler, getMicroseconds());
        });
    }

    return {
        get
    }

}

module.exports = (config.MOCK_AXIOS) ? (axiosMock()) : (axios);