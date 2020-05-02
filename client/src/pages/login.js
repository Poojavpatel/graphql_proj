import React,{Component} from 'react';

class LoginPage extends Component{
  constructor(props){
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  // submitHandler is a method to handle submitting email and password to api
  submitHandler = (event) => {
    event.preventDefault();
    // console.log('---this.emailEl---', this.emailEl);
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;
    const data = {
      query : `
      mutation{
        createUser(userInput:{
          email:${email},
          password:${password}"
        }){
          _id
          name
          mobile
          email
        }
      }
      `
    }

    fetch('http://localhost:5000/graphql', {
      method:'POST',
      body:JSON.stringify(data),
      headers:{
        'Content-Type' : 'application/json'
      }
    });
  }

  render(){
    return(
      <React.Fragment>
        <h1>Login Page</h1>
        <form onSubmit={this.submitHandler}>
          <input type="email" id="email" placeholder="Email" ref={this.emailEl}></input>
          <input type="password" id="password" placeholder="Password" ref={this.passwordEl}></input>
          <button>Switch to Signup</button>
          <button type="submit">Submit</button>
        </form>
        </React.Fragment>
    )
  }
}

export default LoginPage;