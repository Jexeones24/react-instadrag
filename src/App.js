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

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      images: [],
      filter: "",
      selectedValue: "",
      loggedIn: false,
      loggedInUser: null
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
    fetch("http://localhost:3000/api/v1/pictures")
      .then( resp => resp.json())
      .then( images => this.setState({ images }))
  }

  makeImg = (url, caption, category) => {
    fetch('http://localhost:3000/api/v1/pictures', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `${url}`,
        caption: `${caption}`,
        category: `${category}`,
        user_id: this.state.loggedInUser.id
      })
    })
    .then( resp => resp.json())
      .then( newImg => this.setState({
        images: [...this.state.images, newImg]
      }))
  }

  deleteImg = (img) => {
    fetch(`http://localhost:3000/api/v1/pictures/${img.id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `${img.url}`,
        caption: `${img.caption}`,
        category: `${img.category}`
      })
    })
    .then( resp => resp.json())
      .then( newImages => this.setState({ images: newImages}) )
  }


  makeEdit = (newCaption, objId, category) => {
      fetch(`http://localhost:3000/api/v1/pictures/${objId}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          caption: `${newCaption}`,
          category: `${category}`
        })
      })
      .then( resp => resp.json())
        .then( newImg => {
          let index = this.state.images.findIndex(image=> image.id === objId)
          this.setState({
            images: [
             ...this.state.images.slice(0,index),
             Object.assign({}, this.state.images[index], newImg),
             ...this.state.images.slice(index+1)
           ]
         });
        })
      }

//       .then( user => console.log(user) )

  // put password/username in state
  getUser = (e) => {
    e.preventDefault()

    let password = e.target.childNodes[2].value
    let username = e.target.childNodes[0].value
    fetch(`http://localhost:3000/api/v1/sessions`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'username': username,
        'password': password
      })
    })
    .then( resp => resp.json())
      .then( data => {
        this.setState({ loggedIn: true, loggedInUser: data })
          localStorage.setItem('token', data.jwt)
      })
  }

  renderLogin = () => {
    return(
      <Login getUser={this.getUser}/>
    )
  }

  loginRoute = () =>{
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
      </div>
    )
  }


  render() {
    return (

        <div className="App">
          { !this.state.loggedIn ? this.loginRoute() : this.renderMainBody() }
      </div>
    );
  }
}

export default App;
