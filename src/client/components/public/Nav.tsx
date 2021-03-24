import React from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends React.Component<INavProps, INavState> {
    constructor(props: INavProps) {
      super(props);
  
      this.state = {
        blogs: []
      };
    }
  
    render() {
      return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul className="navbar-nav justify-content-end">
        <li className="nav-item">
          <Link to="/" className=" mt-5 mx-5 mb-5">Blogs</Link>
          <Link to="/new" className="mt-5 mx-5 mb-5">Add Blog</Link>
          <Link to="/donate" className="mt-5 mx-5 mb-5">Donate</Link>
          <Link to="/login" className="mt-5 mx-5 mb-5">Log In</Link>
          <Link to="/register" className="mt-5 mx-5 mb-5">Register</Link>
          <Link to="/contact" className="mt-5 mx-5 mb-5">Contact</Link>
          </li>
        </ul>
      </nav>
      );
    }
  }
  
  interface INavProps {}
  
  interface INavState {
    blogs: { id: number; title: string; content: string }[];