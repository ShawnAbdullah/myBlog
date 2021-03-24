import React from 'react';
import { json} from '../../utils/api';

import BlogCard from './BlogCard';

export default class Card extends React.Component<IBlogListProps, IBlogListState> {
    constructor(props: IBlogListProps) {
        super(props);

        this.state = {
            blogs: []
    }; 
}

async componentDidMount() {
  try {
    let blogs = await json('/api/blogs');
    this.setState({ blogs });
  } catch (e) {
    console.log(e);
  }
}
  render() {
    return(
  
      <main className="container">
        <section className="row">
          {this.state.blogs.map(blog => <BlogCard key={blog.id} blog={blog} /> )}
        </section>
      </main>
    
    );
  }
}

interface IBlogListProps {}

interface IBlogListState {
    blogs: { 
        id: number,
        title: string, 
        content: string,
        authorid: number,
        _created: Date,
        name: string
      }[];
}
