import request from "../utils/request";

export function appraise(params) {
    const {id} = params;
    return request('PUT', `/api/appraisal/post/${id}/new-appraise`, params);
}

export function post(params) {
    const {id} = params;
    return request('GET', '/api/appraisal/post/' + id, params);
}

export function supplement(params) {
    const {id} = params;
    return request('PUT', `/api/appraisal/post/${id}`, params);
}

export function changeAppraiser(params) {
    return request('POST', '/api/appraisal/change-appraiser', params);
}