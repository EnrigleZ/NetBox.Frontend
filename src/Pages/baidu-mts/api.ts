import qs, { ParsedUrlQueryInput } from 'querystring'
import HttpRequest from '@/Request';

const request = HttpRequest.GetInstance();

export const GetTreeNames = async () => {
    const ret = request.get('/api/mts/trees');
    return ret;
}

export const GetTreeIndex = async (params) => {
    const ret = request.get(`/api/mts/tree?${qs.stringify(params)}`);
    return ret;
}

export const PostCreateRandomTree = async (params) => {
    const ret = request.post('api/mts/generate-random-tree/', params);
    return ret;
}