import React, { Component, Fragment } from 'react';
import { json, User } from '../../utils/api';
import { RouteComponentProps } from 'react-router-dom';



class AddBlog extends React.Component<IAddBlogProps, IAppBlogState> {
    constructor(props: any) {
        super(props);

        this.state = {
            title: '',
            content: '',
            name: '',
            selectedTag: '0',
            saveStatus: '',
            tags: []
        }
    }

    private alert: JSX.Element = null;
    private saving: boolean = false;

    async componentDidMount() {
        if (!User || User.userid === null || User.role !== 'admin') {
            this.props.history.replace('/admin');
            console.log(User);
        }

        try {
            let tags = await json('/api/tags');
            this.setState({ tags });
        } catch (e) {
            console.log(e);
        }
    }

    
     async handleAddBlog (e: React.FormEvent<HTMLFormElement>) {
         
        e.preventDefault();

        if (this.saving) return;

        let body = { 
            title: this.state.title, 
            content: this.state.content,
            name: this.state.name,
            authorid: User.userid,
            tagid: this.state.selectedTag
             };

        try {
            this.saving = true
            let result = await json('/api/blogs/', 'POST', body);
            if(result) {
                this.setState({
                    title: '',
                    content: '',
                    name: '',
                    saveStatus: 'success'
                });
                this.props.history.push('/');
            } else {
                this.setState({ saveStatus: 'error' });
            }
        } catch (e) {
            this.setState({ saveStatus: 'error' })
            throw e;
        } finally {
            this.saving = false;
        }
    }    
    
render() {

    if (this.state.saveStatus === 'success') {
        this.alert = <div className='alert alert-success p-1 m-3' role='alert'>Blog Added</div>
    } else if(this.state.saveStatus === 'error') {
        this.alert = <div className='alert alert-danger p-1 m-3' role='alert'>Error Adding Blog</div>

    }

    return (
        <div className="container">
                <div className="form-group m-2">
                    <form className="p-4 bg-light border border-dark rounded"
                    onSubmit={(e) => this.handleAddBlog(e)} >
                        <label className="font-weight-bold">Blog Title </label>
                        <input type="text" value={this.state.title} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ title: e.target.value })}
                        className="form-control" id="blog-title"
                        placeholder="Blog Title" />
                        <label className="font-weight-bold">Blog Tag</label>
                        <select value={this.state.selectedTag}
                         onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            this.setState({ selectedTag: e.target.value });
                        }} 
                         className="form-control">
                            <option value="0">Select a tag...</option>
                            {this.state.tags.map(tag => (
                                <option key={tag.id} value={tag.id}>{tag.name}</option>
                            ))}
                        </select>
                        <label className="font-weight-bold">Blog Text</label>
                        <input className="form-control"
                         value={this.state.content} id="blog-text" 
                         onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            this.setState({ content: e.target.value });
                        }}
                            placeholder="Type here ..." />
                        <button type="submit" className="btn btn-primary m-2">Submit</button>
                        {this.alert}
                    </form>
                </div>
            </div>
        );
    }   
}



    interface IAddBlogProps extends RouteComponentProps { }

    interface IAppBlogState{
        title: string;
        content: string;
        name: string;
        selectedTag: string;
        saveStatus: string;
        tags: {
            id: number,
            name: string,
            _created: Date
        }[];
    }

    export default AddBlog;
