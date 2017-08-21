import React, { Component } from 'react';
import SubmitForm from './components/SubmitForm'
import Filter from './components/Filter'
import EditForm from './components/EditForm'
import { Grid } from 'semantic-ui-react'
import Gallery from './components/Gallery'
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      images: [],
      options: [],
      filter: ""
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


  makeEdit = (newCaption, objId) => {
      fetch(`http://localhost:3000/api/v1/pictures/${objId}`, {
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

  addFilterOption = (caption) => {
    this.setState({ options: [...this.state.options, caption]})
  } // do we want these options to persist/be deleted once there are no pictures with that caption anymore?

  changeFilter = (option) => {
    let filteredPics = this.state.images.filter((image) => image.caption === option)
    this.setState({ images: filteredPics })
  }

  render() {
    return (
      <div className="App">
          <Grid celled>
            <Grid.Row>
              <SubmitForm makeImg={this.makeImg} addFilterOption={this.addFilterOption}/>
              <Filter options={this.state.options} changeFilter={this.changeFilter}/>
            </Grid.Row>
          </Grid>
          <Grid celled>
            <Gallery allImages={this.state.images} deleteImg={this.deleteImg} makeEdit={this.makeEdit}/>
         </Grid>
      </div>
    );
  }
}

export default App;
