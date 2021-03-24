import * as express from 'express';

import DB from '../../db';

const router = express.Router();

router.get('/:blogid', async (req, res, next) => {
    try {
        let blogid = req.params.blogid;
        res.json(await DB.blogtags.getBlogTags(blogid))
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
   });


   export default router;
