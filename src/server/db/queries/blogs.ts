import { Query } from '../index';


const all = async () => Query('SELECT * from blogs');   
const one = async (id: number) => Query('SELECT * from blogs WHERE id = ?', [id]);
const deleteBlog = async (id: number) => Query('DELETE FROM blogs where id = ?', [id]);
const postBlog = async (title: string, content: string,  name: string) => Query(`INSERT INTO blogs (title, content, name) VALUES ('${title}', '${content}', '${name}')`);
const updateBlog = async (id: number, title: string, content: string) => Query(`UPDATE blogs SET title = '${title}', content = '${content}' WHERE id = ?`, [id]);



export default {
    all, 
    one,
    deleteBlog,
    postBlog,
    updateBlog, 
}
