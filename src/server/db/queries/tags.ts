import { Query } from '../index';

const getAll = async () => Query(`SELECT * FROM tags`);

export default {
    getAll
}
