import React, { Component } from 'react';
import './App.css';
import SubmitForm from './components/SubmitForm'
import EditForm from './components/EditForm'
import Gallery from './components/Gallery'

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      images: [],
      edited: []
    }
  }

  componentDidMount(){
    fetch("http://localhost:3000/api/v1/pictures")
      .then( resp => resp.json())
        .then( images => this.setState({ images }))
  }

  makeImg = (url, caption) => {
    fetch('http://localhost:3000/api/v1/pictures', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `${url}`,
        caption: `${caption}`,
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
      })
    })
    .then( resp => resp.json())
      .then( newImages => this.setState({ images: newImages}) )
  }

  // don't remember what this is for?
  editImg = (image) => {
    console.log(image)
    this.setState({ edited: image.url})
  }

  makeEdit = (newCaption) => {

    let id = this.state.edited.id //undefined
      fetch(`http://localhost:3000/api/v1/pictures/${id}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          caption: `${newCaption}`,
        })
      })
      .then( resp => resp.json())
        .then( newImg => {console.log(newImg)})
  }

  render() {
    return (
      <div className="App">
        <SubmitForm makeImg={this.makeImg}/>
        <Gallery allImages={this.state.images} deleteImg={this.deleteImg} editImg={this.editImg} makeEdit={this.makeEdit}/>
      </div>
    );
  }
}

export default App;
