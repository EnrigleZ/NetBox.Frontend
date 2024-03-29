import qs, { ParsedUrlQueryInput } from 'querystring';
import HttpRequest from '../../Request'

const request = HttpRequest.GetInstance()

export const PostImage = async (data: FormData) => {
    const ret = request.post('/api/image/create', data);
    return ret;
}

export const PostNote = async (data: FormData) => {
    const ret = request.post('/api/note/create', data);
    return ret;
}

export const GetNotes = async () => {
    const ret = request.get('/api/note/list');
    return ret;
}

export const GetNote = async (params: ParsedUrlQueryInput) => {
    const ret = request.get(`/api/note?${qs.stringify(params)}`);
    return ret;
}