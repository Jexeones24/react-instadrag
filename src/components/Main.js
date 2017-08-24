import React from 'react'
import SubmitForm from './SubmitForm'
import Filter from './Filter'
import Gallery from './Gallery'
import PicturesAdapter from '../adapters/PicturesAdapter'
import SessionsAdapter from '../adapters/SessionsAdapter'

export default class Main extends React.Component {

    constructor() {
      super()

      this.state = {
        images: [],
        filter: "",
        selectedValue: "",
        currentUser: {},
        loggedIn: false
      }
    }

    componentWillReceiveProps(props) {
      {props.loggedIn ? props.history.push('main') : props.history.push('login')}
    }

    componentDidMount(){
      console.log("Mounting Main")
        SessionsAdapter.currentUser()
          .then(currentUser => {
            console.log("Current User",currentUser)
            this.setState({currentUser, loggedIn: true})
          })
          .then( () => {
            console.log("Getting Pictures", this.state.currentUser)
            PicturesAdapter.getPictures(this.state.currentUser)
              .then( images => {
                console.log(images)
                this.setState({ images: images })
              })
          })

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
         return this.state.images.filter((image) => {
          return  image.caption.toLowerCase().includes(this.state.filter.toLowerCase()) ||  image.category.toLowerCase().includes(this.state.filter.toLowerCase())
        })
      } else {
          return this.state.images
       }
      }


    // filterUserImages(){
    //   debugger
    //   let currentUser = this.state.currentUser
    //   let userImages = this.state.images.filter((image) => {image.user_id === this.state.currentUser.id})
    //   // console.log(userImages)
    //
    // }

    logOut = () => {
      // debugger
        this.setState({loggedIn: false, currentUser: {}})
        localStorage.token = ""
        this.props.history.push("login")
    }

  render(){
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
}
