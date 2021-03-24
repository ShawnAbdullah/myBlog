import * as express from 'express';
import DB from '../../db';

const router = express.Router();

router.get('/:id', async (req, res, next) => {
    let id = req.params.id;
    try {
        let user = await DB.users.getOneById(id);
        res.send(user);     
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default router;
