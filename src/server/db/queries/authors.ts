import { Connection } from '../index';


export const allAuthor = async () => {
    return new Promise((resolve, reject) => {

        Connection.query('SELECT * from authors', (err, results) => {
            if(err) {
                return reject(err);
            }
            resolve(results);
        })
    })
}

export default {
    allAuthor
}
