import * as React from "react";
import * as moment from "moment";
import { Link } from "react-router-dom";


export interface BlogCardProps {
  blog: { 
    id: number; 
    title: string; 
    content: string; 
    authorid: number; 
    name: string;
    _created: Date
   };
}

const BlogCard: React.SFC<BlogCardProps> = props => {
  return (
    <div className="col-md-6">
      <div className="card m-2 border border-info">
        <div className="card-body">
          <h5 className="card-title font-weight-bold border border-dark border-top-0 border-left-0 border-right-0">
            {props.blog.title} </h5>
            <h6 className="card-date font-weight-bold">{moment(props.blog._created).format("MMM Do, YYYY")}</h6>
            <p className="card-text">{props.blog.name}</p>
            <Link to={`/view/${props.blog.id}`} className="btn btn-outline-info mt-2">View Blog</Link>
         
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
