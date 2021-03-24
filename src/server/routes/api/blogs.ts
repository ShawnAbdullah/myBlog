import * as express from 'express';
import DB from '../../db';

const router = express.Router();

const isAdmin: express.RequestHandler = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.sendStatus(401);
    } else {
        return next();
    }
};


router.get('/:id?', async (req, res, next) => {
    let id = req.params.id;
    if (id) {
        try {
            let [blog] = await DB.blogs.one(id);
            res.json(blog);
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    } else {
        try {
            let blogs = await DB.blogs.all();
            res.send(blogs);
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    }
});


router.post('/', isAdmin,  async (req, res, next) => {
    try {
     let title = req.body.title;
     let name = req.body.name;
     let content = req.body.content;
     //insert into blogs, get the blogid
       let { insertId }: any = await DB.blogs.postBlog(title, content, name);
     //insert into blogtags with that blogid and the tagid from front-end
       await DB.blogtags.insertBlogTag(insertId, req.body.tagid);
        res.json({message: 'Blog added!'});
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.put('/:id', isAdmin, async (req, res, next) => {
 try {
     let id = req.params.id;
     let title = req.body.title;
     let content = req.body.content;
     res.json(await DB.blogs.updateBlog(id, title, content));
 } catch (e) {
     console.log(e);
     res.sendStatus(500);
 }
});

router.delete('/:id', isAdmin, async (req, res, next) => {
 try {
     let id = req.params.id;
     res.json(await DB.blogs.deleteBlog(id));
 } catch (e) {
     console.log(e);
     res.sendStatus(500);
 }
});



export default router;
