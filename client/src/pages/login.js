import React,{Component} from 'react';
import LoginContext from '../context/login-context';
import './login.css';

class LoginPage extends Component{
  state = {
    isLogin: true
  }

  static contextType = LoginContext;

  constructor(props){
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  // submitHandler is a method to handle submitting email and password to api
  submitHandler = async (event) => {
    event.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;
    const data = {
      query : `
        query{
          login(email:"${email}", password:"${password}"){
            userId
            token
          }
        }
      `
    }

    const response = await fetch('http://localhost:5000/graphql', {
      method:'POST',
      body:JSON.stringify(data),
      headers:{
        'Content-Type' : 'application/json'
      }
    });
    if(!(response.status === 200 || response.status === 201)){
      console.log('Failed!')
      return false;
    }
    const responseData = await response.json();
    if(responseData.data && responseData.data.login.token){
      this.context.login(
        responseData.data.login.token,
        responseData.data.login.userId
      );
    }
  }

  showSwitchHandler = () => {
    this.setState(prevState => {
      return {isLogin : !prevState.isLogin};
    })
  }

  render(){
    return(
      <form className="auth-form" onSubmit={this.submitHandler}>
        <div className="form-control">
          <label htmlFor="email">E-Mail</label>
          <input type="email" id="email" placeholder="Email" ref={this.emailEl}></input>
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Password" ref={this.passwordEl}></input>
        </div>
        <div className="form-actions">
          <button onClick={this.showSwitchHandler}>Switch to {this.state.isLogin ? 'Signup' : 'Login'}</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    )
  }
}

export default LoginPage;