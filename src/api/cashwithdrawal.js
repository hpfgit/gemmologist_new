import request from '../utils/request';

export function drawCashDetail(params) {
    return request('GET', '/api/appraisal/drawCash/detail', params);
}