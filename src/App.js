import React, { Component } from 'react';
import EditForm from './components/EditForm'
import { Grid } from 'semantic-ui-react'
import './App.css';
import Login from './components/Login'
import Home from './components/Home'
import NavBar from './components/NavBar'
import SignUp from './components/SignUp'
import UsersAdapter from './adapters/UsersAdapter'
import Main from './components/Main'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SessionsAdapter from './adapters/SessionsAdapter'
import PicturesAdapter from './adapters/PicturesAdapter'


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      loggedIn: false,
      currentUser: {}
    }
  }

  createUser = (user) => {
    UsersAdapter.createUser(user)
      .then( user => {
        this.setState({
        currentUser: user,
        loggedIn: true
      })
      localStorage.setItem('token', user.jwt)}
    )
  }

  getUser = (formData) => {
    SessionsAdapter.getUser(formData)
      .then( data => {
        this.setState({ loggedIn: true, currentUser: data })
          localStorage.setItem('token', data.jwt)
      })
  }

  renderLogin = (params) => {
    return(
      <Login getUser={this.getUser} history={params.history} loggedIn={this.state.loggedIn}  />
    )
  }

  renderSignUp = (params) => {
    return(
      <SignUp history={params.history} createUser={this.createUser} loggedIn={this.state.loggedIn}/>
    )
  }


  renderHome = (params) => {
    return (
      <Home history={params.history} loggedIn={this.state.loggedIn}/>
    )
  }

  renderMainBody = (params) => {
    return (
     <Main deleteImg={this.deleteImg} makeEdit={this.makeEdit} logOut={this.logOut} selectValueHandleChange={this.selectValueHandleChange} handleChange={this.handleChange} filterImg={this.filterImg} makeImg={this.makeImg} loggedIn={this.state.loggedIn} history={params.history}
     getUser={this.getUser} currentUser={this.state.currentUser}
    />
    )
  }

  render() {
    return (
        <div className="App">
          <Router>
          <div>
              <NavBar />
              <Route exact path="/" render={this.renderHome} />
              <Route exact path="/main" render={this.renderMainBody}/>
              <Route exact path="/login" render={this.renderLogin} />
              <Route exact path="/signup" render={this.renderSignUp} />
          </div>
        </Router>
        </div>
    );
  }
  }

export default App;
