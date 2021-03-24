import * as React from 'react';
import { json } from '../../utils/api';

export default class Email extends React.Component<IEmailProps, IEmailState> {

    constructor(props: IEmailProps) {
        super(props);

        this.state = {
            email: '',
            subject: '',
            message: '',
            emailStatus: null
        }
    }

    private alert: JSX.Element = null;
    private emailing: boolean = false;

    onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(this.emailing) return;
        
        try {
            this.emailing = true;
            let email = this.state.email;
            let subject = this.state.subject;
            let message = this.state.message;
            let result = await json('/api/contact', 'POST', { email, subject, message});
            if (result) {
                this.setState({
                    email: '', 
                    subject: '', 
                    message: '',
                    emailStatus: 'success'
                });
            } else {
                this.setState({ emailStatus: 'error' });
            }
        } catch (e) {
            this.setState({ emailStatus: 'error' });
            throw e;
        } finally {
            this.emailing = false;
        }
    }

    render() {

        if (this.state.emailStatus === 'success') {
            this.alert = <div className='alert alert-success p-1 m-3' role='alert'>Email Sent</div>
        } else if (this.state.emailStatus === 'error') {
            this.alert = <div className='alert alert-danger p-1 m-3' role='alert'>Error Sending Email</div>
        }

        return(
            <main className="container">
                <form className="form=group mt-5 border border-primary rounded p-3 shadow-lg bg-info"
                    onSubmit={this.onSubmit}
                >
                    <label>Email</label>
                    <input type="text" value={this.state.email} className="input-group my-1 p-1" 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: e.target.value })}
                    />
                    <label>subject</label>
                    <input type="text" value={this.state.subject} className="input-group my-1 p-1" 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ subject: e.target.value })}
                    />
                    <label>Message</label>
                    <input type="text" value={this.state.message} className="input-group my-1 p-1" 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ message: e.target.value })}
                    />
                    <button className="btn btn-primary mt-2 shadow">Email Me!</button>
                    {this.alert}
                </form>
            </main>
        );
    }
}

interface IEmailProps {}

interface IEmailState {
    email: string;
    subject: string;
    message: string;
    emailStatus: string;
}
