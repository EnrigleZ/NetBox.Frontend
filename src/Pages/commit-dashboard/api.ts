import qs, { ParsedUrlQueryInput } from 'querystring';
import HttpRequest from '../../Request'

const request = HttpRequest.GetInstance();

export const GetCommits = async () => {
    const ret = request.get('/api/server/commits');
    return ret;
}

export const PostCheckCommit = async (data: FormData) => {
    const ret = request.post('/api/server/check-commit', data);
    return ret;
}
