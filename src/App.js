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
    this.filterImg = this.filterImg.bind(this)
  }

  filterImg(selectValue, inputValue) {
    if (selectValue === "Category") {
      let selectFilterCategory = this.state.images.filter((image) => {
       return image.category.includes(inputValue)
      })
      this.setState({
        images: selectFilterCategory
      })
    } else if (selectValue === "Caption") {
      let selectFilterCaption = this.state.images.filter((image) => {
       return image.caption.includes(inputValue)
      })
      this.setState({
        images: selectFilterCaption
      })
    } else {
      let selectFilterBoth = this.state.images.filter((image) => {
         return image.caption.includes(inputValue) ||  image.category.includes(inputValue)
      })
      this.setState({
        images: selectFilterBoth
      })
    }
  }

  // can you do this???
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
        category: `${category}`
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

  render() {
    return (
      <div className="App">
          <Grid celled>
            <Grid.Row>
              <SubmitForm makeImg={this.makeImg}/>
              <Filter filterImg={this.filterImg}/>
            </Grid.Row>
          </Grid>
          <Grid celled>
            <Gallery
              allImages={this.state.images} deleteImg={this.deleteImg} makeEdit={this.makeEdit}/>
         </Grid>
      </div>
    );
  }
}

export default App;
