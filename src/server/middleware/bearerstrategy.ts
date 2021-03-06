import * as passport from 'passport';
import * as bearerstratrgy from 'passport-http-bearer';

import { ValidToken } from '../utils/security/tokens';
import DB from '../db';

passport.use(new bearerstratrgy.Strategy(async (token, done) => {
    try {
        let payload = await ValidToken(token);
        let [user] = await DB.users.getOneById(payload.userid);
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    } catch (e) {
        done(e);
    }
}))
