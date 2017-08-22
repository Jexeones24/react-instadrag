import React from 'react'

const Login = (props) =>
  <div className="login-container z-depth-4">
    <h1>Login</h1>
    <form>
      <div>
        <label className="left">Username</label>
        <input type="text" name="username" />
      </div>
      <div>
        <label className="left">Password</label>
        <input type="password" name="password" />
      </div>
      <button type="submit" value="Login" className="form-btn submit-edit"> Login</button>
    </form>
  </div>;

  export default Login
