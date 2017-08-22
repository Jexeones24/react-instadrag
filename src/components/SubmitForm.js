import React, { Component } from 'react'

export default class SubmitForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      url: "",
      caption: "",
      category: ""
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

  setCategory = (e) => {
    let category = e.target.value
    this.setState({ category })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const url = this.state.url
    const caption = this.state.caption
    const category = this.state.category
    this.props.makeImg(url, caption, category)
    this.setState({
      url: "",
      caption: "",
      category: ""
    })
  }

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
        <div className="add-img-form-sec">
          <label>CATEGORY: </label>
          <input type="text" ref="category" value={this.state.category} onChange={this.setCategory} required/>
        </div>
        <button className="form-btn submit-edit" type="submit">Submit</button>
        </form>
      </div>
    )
  }
}
