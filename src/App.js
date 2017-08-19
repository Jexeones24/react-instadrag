import React, { Component } from 'react';
import './App.css';
import Form from './components/Form'
import Gallery from './components/Gallery'

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      images: []
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

  render() {
    return (
      <div className="App">
        <Form makeImg={this.makeImg}/>
        <Gallery allImages={this.state.images}/>
      </div>
    );
  }
}

export default App;
