import React, { Component } from 'react';
import './App.css';
import Form from './components/Form'

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      images: [],
      newImg: []
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
      .then( newImg => this.setState({ newImg }))
  }

  render() {
    return (
      <div className="App">
        <Form makeImg={this.makeImg}/>
      </div>
    );
  }
}

export default App;
