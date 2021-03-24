import { Query } from '../index';

const getBlogTags = (blogid: number) => Query(`SELECT t.name FROM blogtags bt JOIN tags t ON t.id = bt.tagid WHERE bt.blogid = ?;`, [blogid]);
const insertBlogTag = (blogid: number, tagid: number) => Query(`INSERT INTO blogtags (blogid, tagid) VALUES (${blogid}, ${tagid})`);

export default {
    getBlogTags,    
    insertBlogTag
}
