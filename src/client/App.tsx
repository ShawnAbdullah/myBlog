import React, { Component, Fragment} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './scss/app';

import Nav from './components/public/Nav'
import AddBlog from './components/public/AddBlog';
import BlogList from './components/public/BlogList';
import OneBlog from './components/public/OneBlog';
import Admin from './components/admin/Admin';
import Login from './components/admin/Login';
import Donate from './components/public/Donate';
import Register from './components/admin/Register';
import Email from './components/public/Email';

export default class App extends React.Component<IAppProps, IAppState> {

    render () {
        return (
           <Router>
               <>
                    <Nav />
                    <div className="container">
                    <Switch>
                        <Route exact path="/" component={BlogList} />
                        <Route exact path="/view/:id" component={OneBlog} />
                        <Route exact path="/:id/admin" component={Admin} />
                        <Route exact path="/new" component={AddBlog} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/donate" component={Donate} />   
                        <Route exact path="/register" component={Register} />  
                        <Route exact path="/contact" component={Email} />                      
                    </Switch>
                    </div>
                    {/* <Footer /> */}
               </>
           </Router>
        )
    }
}

interface IAppProps { }

interface IAppState { }