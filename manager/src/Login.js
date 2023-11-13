import React, {Component} from 'react';
import axios from 'axios';
import backendURL from './Config';
import { redirect } from 'react-router-dom';

class Login extends Component {
    state = { 
        account: {username:"", password:""}
     };
    
    handleLogin = async (e) =>{
        e.preventDefault()
        try{
            const response = await axios.post(`${backendURL}/auth/jwt/create`,this.state.account)
            redirect('/homepage')
        }catch (error){
            console.log('Erro no login:', error.message)
        }
    }
    
    handleChange = e => {
        const account = {...this.state.account};
        account[e.currentTarget.name] = e.currentTarget.value;
        this.setState({account});
    }

    render() { 
        const {account} = this.state;

        return (
                <div style={{alignSelf:'center', justifySelf:'center'}}>
                    <form onSubmit={ e => this.handleLogin(e)}>
                        <label htmlFor='login'>Login</label>
                        <br/>
                        <input name='username' value={this.state.account.username} onChange={this.handleChange} className='form-control' id='username' type='text'></input>
                        <br/>
                        <label htmlFor='password'>Password</label>
                        <br/>
                        <input name='password' value={this.state.account.password} onChange={this.handleChange} className='form-control' id='password' type='text'></input>
                        <br/>
                        <br/>
                        <button>Login</button>
                    </form>
                </div>
        );
    }
}
 
export default Login;