import React from 'react'

const Login = (props) =>
  <div>
    <h1>Login</h1>
    <form onSubmit={props.getUser}>
        <input type="text" name="username" placeholder="Username" />
        <label htmlFor="username">Username</label>
        <input type="password" name="password" placeholder="Password" />
        <label htmlFor="password">Password</label>
      <input type="submit" value="Login" />
    </form>
  </div>;

  export default Login
