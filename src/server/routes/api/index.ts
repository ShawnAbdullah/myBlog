import * as express from 'express';
import * as passport from 'passport';

import blogsRouter from './blogs';
import blogtagsRouter from './blogtags';
import tagsRouter from './tags';
import usersRouter from './users';


const router = express.Router();

router.use((req, res, next) => {
    passport.authenticate('bearer', { session: false }, (err, user, info) => {
        if(user) req.user = user;
        return next();
    })(req, res, next);
});

router.use('/blogs', blogsRouter);
router.use('/blogtags', blogtagsRouter);
router.use('/tags', tagsRouter);
router.use('/users', usersRouter);
router.use('/donate', donateRouter);
router.use('/contact', emailRouter);


export default router;
