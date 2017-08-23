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
      images: [],
      filter: "",
      selectedValue: "",
      loggedIn: false,
      currentUser: {}
    }
  }

  handleChange = (e) => {
    e.preventDefault()
    let filter = e.target.value
    this.setState({filter})
  }

  selectValueHandleChange = (e) => {
    e.preventDefault()
    let selectedValue = e.target.value
    console.log(selectedValue)
    this.setState({selectedValue})
  }

  filterImg = () => {
    if (this.state.selectedValue === "Category") {
      return this.state.images.filter((image) => {
       return image.category.toLowerCase().includes(this.state.filter.toLowerCase())
      })
    } else if (this.state.selectedValue === "Caption") {
      return this.state.images.filter((image) => {
       return image.caption.toLowerCase().includes(this.state.filter.toLowerCase())
      })
    } else if (this.state.selectedValue === "Both") {
        debugger
       return this.state.images.filter((image) => {
        return  image.caption.toLowerCase().includes(this.state.filter.toLowerCase()) ||  image.category.toLowerCase().includes(this.state.filter.toLowerCase())
      })
    } else {
      return this.state.images
    }
  }

  componentDidMount(){
    // debugger
    PicturesAdapter.getPictures()
      .then( images => this.setState({ images }))

    SessionsAdapter.currentUser()
      .then(currentUser => this.setState({currentUser, loggedIn: true}))
  }

  createUser = (user) => {
    UsersAdapter.createUser(user)
      .then( user => this.setState({
        currentUser: user,
        loggedIn: true
      }))
  }

  makeImg = (img) => {
    PicturesAdapter.makeImg(img)
      .then( newImg => this.setState({
        images: [...this.state.images, newImg]
      }))
  }

  deleteImg = (img) => {
      PicturesAdapter.deleteImg(img)
      .then( newImages => this.setState({ images: newImages}) )
  }

  makeEdit = (img) => {
    debugger
      PicturesAdapter.makeEdit(img)
        .then( newImg => {
          let index = this.state.images.findIndex(image=> image.id === img.imageid)
          this.setState({
            images: [
             ...this.state.images.slice(0,index),
             Object.assign({}, this.state.images[index], newImg),
             ...this.state.images.slice(index+1)
           ]
         });
        })
      }

  getUser = (formData) => {
    SessionsAdapter.getUser(formData)
      .then( data => {
        this.setState({ loggedIn: true, currentUser: data })
          localStorage.setItem('token', data.jwt)
      })
  }

  logOut = () => {
      this.setState({loggedIn: false, currentUser: {}})
      localStorage.token = ""
  }

  renderLogin = (params) => {
    return(
      <Login getUser={this.getUser} history={params.history} loggedIn={this.state.loggedIn} />
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
     <Main deleteImg={this.deleteImg} makeEdit={this.makeEdit} logOut={this.logOut} selectValueHandleChange={this.selectValueHandleChange} handleChange={this.handleChange} filterImg={this.filterImg} makeImg={this.makeImg} loggedIn={this.state.loggedIn} history={params.history} />
    )
  }

  render() {
    // debugger
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
