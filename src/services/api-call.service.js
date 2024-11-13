import axios from "axios";

const apiOrigin = "http://localhost:7001";

/**
 * Makes a GET request to the specified URL.
 * 
 * @param {string} url - The endpoint URL to send the GET request to.
 * @param {string} [baseURL] - The base URL for the request. Defaults to `apiOrigin`.
 * @param {string} [responseType] - The type of data expected in the response. Defaults to "json".
 * @returns {Promise<any>} - A promise that resolves with the response data.
 */
export const get = (url, baseURL, responseType) => {
    return new Promise((resolve, reject) => {
        axios({
            method: "get",
            url: url,
            baseURL: baseURL || apiOrigin,
            responseType: responseType || "json",
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            }
        }).then((response) => {
            if (response.data && response.data.data) {
                resolve(response.data.data);
            } else {
                resolve(response.data);
            }
        }).catch(async (error) => {
            console.error(error);
            if (error.response && error.response.data) {
                reject(await extractError(error.response.data, responseType));
            } else {
                reject(error);
            }
        })
    })
}



/**
 * Makes a POST request to the specified URL with the provided data.
 * 
 * @param {string} url - The endpoint URL to send the POST request to.
 * @param {any} data - The data to be sent in the POST request body.
 * @param {string} [baseURL] - The base URL for the request. Defaults to `apiOrigin`.
 * @param {string} [responseType] - The type of data expected in the response. Defaults to "json".
 * @returns {Promise<any>} - A promise that resolves with the response data.
 */
export const post = (url, data, baseURL, responseType) => {
    return new Promise((resolve, reject) => {
        axios({
            method: "post",
            url: url,
            baseURL: baseURL || apiOrigin,
            responseType: responseType || "json",
            withCredentials: true,
            data: data,
            headers: {
                "Content-Type": "application/json",
            }
        }).then((response) => {
            if (response.data && response.data.data) {
                resolve(response.data.data);
            } else {
                resolve(response.data);
            }
        }).catch(async (error) => {
            console.error(error);
            if (error.response && error.response.data) {
                reject(await extractError(error.response.data, responseType));
            } else {
                reject(error);
            }
        })
    })
}

/**
 * Extracts and parses the error message from the response based on the response type.
 * 
 * @param {any} error - The error object from the response.
 * @param {string} responseType - The type of data expected in the response.
 * @returns {Promise<any>} - A promise that resolves with the parsed error message.
 */
const extractError = async (error, responseType) => {
    switch (responseType) {
        case "blob":
            return JSON.parse(await error.text());
        default:
            return error;
    }
} 