import React from 'react'

const Login = (props) =>
  <div className="login-container z-depth-4">
    <h1>Login</h1>
    <form onSubmit={props.getUser}>
        <label className="left">Username</label>
        <input type="text" name="username" />
        <label className="left">Password</label>
        <input type="password" name="password" />
        <button type="submit" value="Login" className="form-btn submit-edit"> Login</button>
    </form>
  </div>;

  export default Login
