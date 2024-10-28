import { baseUrl } from "../../config/url";
// import { getToken } from "../functions/asyncStorage";

type getOptionsType = {
    token?: string,
    params?: object,
    baseUrl?: string,
    signal?: any,
}

type postOptionsType = {
    token?: string,
    formData?: any,
    body?: object,
    baseUrl?: string,
    signal?: any,
}



//---------get api-----------------
export const getApi = async (url: string, options: getOptionsType = { params: {} }) => {

    const baseUrl_ = options.baseUrl || baseUrl;
    let token ='' //await getToken();
    token = token || options.token!;
    //making query param for url
    const params_ = typeof options.params == "object" && Object.keys(options.params).length > 0 ?
        '?' + Object.entries(options.params).map(param => `${param[0]}=${param[1]}`).join('&') : '';

    const url_ = `${baseUrl_}${url}${params_}`;
    console.log(`GET REQ: ${url_}`);
    return fetch(
        url_,
        {
            headers: {
                "Authorization": token ? "Bearer " + token : '',
                "Content-Type": "application/json"
            },
            credentials: "same-origin",
            signal: options?.signal,
        }
    )
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText); //error if user not found etc
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);  //error if we face problem to connect server
                throw errmess;
            })
        .then((res) => res.json());
}



//---------post api-----------------

export const postApi = async (url: string, options: postOptionsType = { body: {}, token: '' }) => {

    const baseUrl_ = options.baseUrl || baseUrl;
    let token = ''//await getToken();
    token = token || options.token!;
    const url_ = baseUrl_ + url;

    console.log(`POST REQ: ${url_}`);

    return fetch(
        url_,
        {
            method: "POST",
            body: options.formData ? options.formData : JSON.stringify(options.body || {}),
            headers: {
                "Content-Type": options.formData ? 'multipart/form-data' : "application/json",
                "Authorization": token ? "Bearer " + token : '',
                // "Accept": "application/json"
            },
            credentials: "same-origin",
            signal: options?.signal,
        }
    )
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText); //error if user not found etc
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);  //error if we face problem to connect server
                throw errmess;
            })
        .then((res) => {
            return res.json();
        })
}