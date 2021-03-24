import * as express from 'express';

import DB from '../../db';

const router = express.Router();


router.get('/', async (req, res, next) => {
    try {
        let tags = await DB.tags.getAll();
        res.json(tags);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
   });

   export default router;
