import React, { Component } from 'react'

export default class SubmitForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      url: "",
      caption: ""
    }
  }

  setUrl = (e) => {
    let url = e.target.value
    this.setState({ url })
  }

  setCaption = (e) => {
    let caption = e.target.value
    this.setState({ caption })

  }

  handleSubmit = (e) => {
    e.preventDefault()
    const url = this.state.url
    const caption = this.state.caption
    this.props.makeImg(url, caption)
    this.setState({
      url: "",
      caption: ""
    })
  }

  // clicking on submit makes blank caption with edit/delete buttons
  // need validations to check for valid input
  render(){
    return(
      <div className="form submit-form">
        <form className="url-caption" onSubmit={this.handleSubmit}>
        <div className="add-img-form-sec">
          <h5> Add an Image </h5>
          <label>URL:</label>
          <input type="url" ref="url" value={this.state.url} onChange={this.setUrl} required/>
        </div>
        <div className="add-img-form-sec">
          <label>CAPTION: </label>
          <input type="text" ref="caption" value={this.state.caption} onChange={this.setCaption} required/>
        </div>
        <button className="form-btn" type="submit">Submit</button>
        </form>
        <hr/>
      </div>
    )
  }
}
