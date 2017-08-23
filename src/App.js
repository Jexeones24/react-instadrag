import React, { Component } from 'react';
import SubmitForm from './components/SubmitForm'
import Filter from './components/Filter'
import EditForm from './components/EditForm'
import { Grid } from 'semantic-ui-react'
import Gallery from './components/Gallery'
import './App.css';
import Login from './components/Login'
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
      .then(currentUser => this.setState({currentUser}))
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

  renderLogin = () => {
    return(
      <Login getUser={this.getUser}/>
    )
  }

  loginRoute = () =>{
    // this.checkLocalStorage()
    return(
      <div>
        <Router>
          <Route exact path="/login" render={this.renderLogin}/>
        </Router>
      </div>
    )
  }

  renderMainBody = () => {
    return (
      <div>
        <div className="ui celled grid">
          <div className="row">
            <SubmitForm makeImg={this.makeImg}/>
            <Filter handleChange={this.handleChange} selectValueHandleChange={this.selectValueHandleChange}/>
          </div>
        </div>
        <div className="ui celled grid">
          <Gallery
            allImages={this.filterImg()} deleteImg={this.deleteImg} makeEdit={this.makeEdit}/>
        </div>
        <div className="grid">
          <button className="form-btn submit-edit" onClick={this.logOut}>
            Logout
          </button>
        </div>
      </div>
    )
  }


  render() {
    return (
        <div className="App">
          { !localStorage.getItem('token')? this.loginRoute() : this.renderMainBody() }
      </div>
    );
  }
}

export default App;
