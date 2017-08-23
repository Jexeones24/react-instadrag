import React from 'react'
import { Link } from 'react-router-dom'

class Login extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      username: "",
      password: ""
    }
  }

  componentWillReceiveProps(props) {

     if (props.loggedIn) {
       props.history.push('main')
     }
  }

  getFormInput = (e) => {
    const value = e.target.value
    const property = e.target.name
    this.setState({ [property]:value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.getUser(this.state)
  }

  render(){
    return(
      <div className="login-container z-depth-4">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <label className="left">Username</label>
          <input type="text" name="username" value={this.state.username} onChange={this.getFormInput}/>
          <label className="left">Password</label>
          <input type="password" name="password" value={this.state.password} onChange={this.getFormInput}/>
          <button type="submit" value="Login" className="form-btn submit-edit"> Login</button>
        </form>
      </div>
    )
  }
}

export default Login
