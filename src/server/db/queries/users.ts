import { Query } from '../index';

const allAuthors = async () => Query(`SELECT * from authors`);

const getOneAuthor = async (id: number) => Query(`SELECT * from authors WHERE id = ?`, [id]);

const findOneByEmail = async (email: string) => Query(`SELECT * FROM authors WHERE email = '${email}' LIMIT 1`);

const getOneById = async (id: number) => Query(`SELECT * FROM authors WHERE id = ${id} LIMIT 1`);

const insert = async (user: any) => Query(`INSERT INTO authors (email, password) VALUES ?`, user);

const findauthorsname = async (name: string) => Query(`SELECT * from authors WHERE name = '${name}' LIMIT 1`);

export default {
    allAuthors,
    getOneAuthor,
    findOneByEmail,
    getOneById,
    insert,
    findauthorsname
}
