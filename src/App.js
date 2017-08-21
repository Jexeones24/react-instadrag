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
      options: []
    }
  }

  // can you do this???
  componentDidMount(){
    this.fetchPics()
    this.fetchFilters()
  }

  fetchPics = () => {
    fetch("http://localhost:3000/api/v1/pictures")
      .then( resp => resp.json())
      .then( images => this.setState({ images }))
  }

  fetchFilters = () => {
    fetch("http://localhost:3000/api/v1/categories")
      .then( resp => resp.json())
        .then( options => this.setState({ options }))
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

  addFilterOption = (name) => {
    fetch('http://localhost:3000/api/v1/categories', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: `${name}`
      })
    })
    .then( resp => resp.json())
      .then( newFilter => this.setState({
        options: [...this.state.options, newFilter]
      }))
  }

  // filters once and replaces all images with filtered items, then
  // next search, all items are gone
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
              <Filter changeFilter={this.changeFilter} options={this.state.options}
              />
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
