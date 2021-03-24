import * as React from "react";
import * as moment from "moment";
import { json } from '../../utils/api';
import { RouteComponentProps } from "react-router-dom";
import { Link } from 'react-router-dom';


class OneBlog extends React.Component<IOneBlogProps, IOneBlogState> {
  
  constructor(props: IOneBlogProps) {
    super(props);
    this.state = {
      blog: {
        id: null,
        title: null,
        content: null,
        authorid: null,
        _created: null,
        name: null,
      },
      tags: []
    };
  }

  async componentWillMount() {
    let id = this.props.match.params.id;
    try {
      let blog = await json(`/api/blogs/${id}`);
      let tags = await json(`/api/blogtags/${id}`);
      this.setState({ blog, tags });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center">{this.state.blog.title}</h1>
          <h6> {this.state.blog.authorid}</h6>
          <div>
            {this.state.tags.map((tag, index) => <span key={index} className="badge badge-info p-2 my-1 mx-2">{tag.name}</span>)}
          </div>
          <h6>{moment(this.state.blog._created).format("MMM Do, YYYY")}</h6>
          <p>{this.state.blog.content}</p>
          <Link to="/" className="btn btn-outline-dark mt-2">Go Back</Link>
          <Link
            to={`/${this.props.match.params.id}/admin`}
            className="btn btn-outline-info mt-2">Edit Blog</Link>
        
        </div>
      </div>
    );
  }
}

interface IOneBlogProps extends RouteComponentProps<{ id: string}> { }

interface IOneBlogState {
  blog: {
    id: number,
    title: string,
    content: string,
    authorid: number,
    _created: Date,
    name: string
  };
  tags: { 
    id: number,
    name: string,
  }[]
}

export default OneBlog;
