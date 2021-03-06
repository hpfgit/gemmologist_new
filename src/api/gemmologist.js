import request from "../utils/request";

export function appraise() {
    return request('GET', '/api/appraisal/post/my/appraise', {});
}

export function appraisal() {
    return request('GET', '/api/appraisal/appraiser/brand', {});
}

export function newAppraise(params) {
    return request('GET', '/api/appraisal/post/my/new-appraise', {});
}

export function workOrder(params) {
    return request('POST', '/api/appraisal/post/work-order', params);
}