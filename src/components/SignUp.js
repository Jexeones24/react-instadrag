import React from 'react'

class SignUp extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      username: "",
      password: "",
      email: ""
    }
  }

  getFormInput = (e) => {
    const value = e.target.value
    const property = e.target.name
    this.setState({ [property]:value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.createUser(this.state)
  }

  render(){
    return(
      <div className="login-container z-depth-4">
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          <label className="left">Email</label>
          <input type="text" name="email" value={this.state.email} onChange={this.getFormInput}/>
          <label className="left">Username</label>
          <input type="text" name="username" value={this.state.username} onChange={this.getFormInput}/>
          <label className="left">Password</label>
          <input type="password" name="password" value={this.state.password} onChange={this.getFormInput}/>
          <button type="submit" value="Login" className="form-btn submit-edit"> Sign Up</button>
        </form>
      </div>
    )
  }

}

export default SignUp
