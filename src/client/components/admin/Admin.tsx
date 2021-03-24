import * as React from 'react';
import { json, User } from '../../utils/api';
import { RouteComponentProps } from 'react-router-dom';


export default class Admin extends React.Component<IAdminProps, IAdminState> {
    constructor(props: IAdminProps) {
        super(props);

        this.state = {
            id: null,
            title: '',
            content: '',
            saveStatus: '',
            deleteStatus: ''
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    private alert: JSX.Element = null;
    private saving: boolean = false;
    private delete: boolean = false;

    async componentDidMount() {
        if(!User || User.userid === null || User.role !== 'admin' || User.role !== 'guest') {
            this.props.history.replace('/login');
            console.log(User);
        }

        let id = this.props.match.params.id;
        
        try {
            let blog = await json(`/api/view/${id}`);
            this.setState({
                id: blog.id,
                title: blog.title, 
                content: blog.content});
        } catch (e) {
            console.log(e);
        }
    }



        async handleEdit(e: React.MouseEvent<HTMLButtonElement>) {
            e.preventDefault();

        if (this.saving) return

        let id = this.props.match.params.id;
        let body = { 
            content: this.state.content, 
            title: this.state.title
         }

        try {

            this.saving = true;
            let result = await json(`/api/view/${id}`, 'PUT', body);
            if(result) {
                this.setState({
                    title: '',
                    content: '',
                    saveStatus: 'success'
                })
            } else {
                this.setState({ saveStatus: 'error' });
            }
        } catch (e) {
            this.setState({ saveStatus: 'error' });
            console.log(e);
        } finally {
            this.saving = false;
        }
    }   

    async handleDelete (e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

        if(this.delete) return;

        let id = this.props.match.params.id;
        try {
            this.delete = true;
            let result = await json(`/api/view/${id}`, 'DELETE');
            if (result) {
                this.setState({ 
                    title: '',
                    content: '',
                    deleteStatus: 'success'
                });
            } else {
                this.setState({ deleteStatus: 'error' });
            }
        } catch (e) {
            this.setState({ deleteStatus: 'error' });
            console.log(e);
        } finally {
            this.delete = false;
        }
    }
    
render() {

    
    if(this.state.saveStatus === 'success') {
        this.alert = <div className='alert alert-success p-1 m-3' role='alert'>Blog Edited</div>
    } else if(this.state.saveStatus === 'error') {
        this.alert = <div className='alert alert-danger p-1 m-3' role='alert'>Error Editing Blog</div>
    }

    if(this.state.deleteStatus === 'success') {
        this.alert = <div className='alert alert-success p-1 m-3' role='alert'>Blog Deleted</div>
    } else if(this.state.deleteStatus === 'error') {
        this.alert = <div className='alert alert-danger p-1 m-3' role='alert'>Error Deleting Blog</div>
    }


    return (
        <>
        <div className="container">
            <div className="row my-2">
                <div className="col-md-12">
                    <form className="form-group p-3 border border-dark rounded">
                        <label>Title: </label>
                        <input
                            value={this.state.title}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                this.setState({ title: e.target.value });
                            }}
                            className="p-1 form-control"
                            placeholder="Title ..." />
                        <label>Blog Message: </label>
                        <input
                            value={this.state.content}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                this.setState({ content: e.target.value });
                            }}
                            className="p-1 form-control"
                            placeholder="Type here ..." />
                        <button onClick={ this.handleEdit } className="btn btn-lg btn-primary mt-2">Save Edit!</button>
                        <button onClick={ this.handleDelete } className="btn btn-lg btn-danger mt-2">Delete!</button>
                        {this.alert}
                    </form>
                </div>
            </div>
        </div>
        </>
        );
    }   
}



    interface IAdminProps extends RouteComponentProps<{ id: string; }> { }

    interface IAdminState {
        id: number;
        title: string;
        content: string;
        saveStatus: string;
        deleteStatus: string;
    }
