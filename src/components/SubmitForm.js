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

  setValues = (e) => {
    const value = e.target.value
    const property = e.target.name
    this.setState({ [property]:value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.makeImg(this.state)
  }

  render(){
    return(
      <div className="form submit-form">
        <form className="url-caption" onSubmit={this.handleSubmit}>
        <div className="add-img-form-sec">
          <h5> Add an Image </h5>
          <label>URL:</label>
          <input type="url" name="url" ref="url" value={this.state.url} onChange={this.setValues} required/>
        </div>
        <div className="add-img-form-sec">
          <label>CAPTION: </label>
          <input type="text" name="caption" ref="caption" value={this.state.caption} onChange={this.setValues} required/>
        </div>
        <div className="add-img-form-sec">
          <label>CATEGORY: </label>
          <input type="text" name="category" ref="category" value={this.state.category} onChange={this.setValues} required/>
        </div>
        <button className="form-btn submit-edit" type="submit">Submit</button>
        </form>
      </div>
    )
  }
}
