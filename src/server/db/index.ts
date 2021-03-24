import * as mysql from 'mysql';
import config from '../config';

//table query imports
import blogs from './queries/blogs';
import blogtags from './queries/blogtags';
import tags from './queries/tags';
import users from './queries/users';
import accesstokens from './queries/accesstoken';

export const Connection = mysql.createPool(config.mysql);

// Connection.query(err => {
//     if(err) console.log(err);
// });

export const Query = (query: string, values?: Array<string | number>) => {
    return new Promise<Array<any>>((resolve, reject) => {
        Connection.query(query, values, (err, results) => {
            if(err) return reject(err);
            return resolve(results);
        });
    });
}

export default {
    blogs,
    blogtags,
    tags, 
    users, 
    accesstokens
}
