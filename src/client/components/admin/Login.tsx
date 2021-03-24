import * as React from 'react';
import { json, SetAccessToken, User } from '../../utils/api';
import { RouteComponentProps } from 'react-router-dom';


class Login extends React.Component<ILoginProps, ILoginState> {
    constructor(props: ILoginProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loginStatus: false
        };
    }

    private alert: JSX.Element = null;
    private loggingIn: boolean = false;

    componentDidMount() {
        if(User && User.role === 'admin') {
            this.props.history.replace('/login');
        }
    }

    async handleLogSubmit(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault();

        this.setState({ loginStatus: false });
        if(this.loggingIn) return;

        try {
            this.loggingIn = true;
            let result = await json('/auth/login', 'POST', {
                email: this.state.email,
                password: this.state.password
            });
            
            if(result) {
                SetAccessToken(result.token, { userid: result.userid, role: result.role });
                if (result.role === 'admin') {
                    this.props.history.push('/new');
                } else {
                    this.props.history.push('/');
                }
            } else {
                this.setState({ loginStatus: true });
            }
        } catch (e) {
            this.setState({ loginStatus: true });
            throw(e);
        } finally {
            this.loggingIn = false;
        }

    }

    render() {

        if(this.state.loginStatus) {
            this.alert = <div className='alert alert-danger p-1 m-3' role='alert'>Invalid Crendetials</div>
        }

        return (
            <main className="container">
                <section className="row my-3">
                    <div className="col-md-12">
                        <form className="form-group border border-primary rounded shadow-lg p-3"
                        onSubmit={(e) => this.handleLogSubmit(e)} >
                        <label>Email</label>
                        <input type="email" 
                        className="form-control p-1 mb-1" 
                        placeholder="Type Email Here" 
                        value={this.state.email} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: e.target.value})} />
                        <label>Password</label>
                        <input type="password"
                        className="form-control p-1 mb-1"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({password: e.target.value})} />
                        <button type="submit" className="btn btn-info d-block border border-dark mt-2 py-2 px-4 shadow">Login</button>
                        {this.alert}
                        </form>
                    </div>
                </section>
            </main>
        );
    }
}

interface ILoginProps extends RouteComponentProps { }

interface ILoginState {
    email: string;
    password: string;
    loginStatus: boolean
}

export default Login;
