import React, { Component } from 'react'

export default class EditForm extends Component {
  constructor(props){
    super(props);

    this.state ={
      caption: this.props.caption,
      category: this.props.category
    }
  }

  handleChangeCategory = (e) => {
    let categoryValue = e.target.value
    this.setState({
      category: categoryValue
    })
  }

  handleChangeCaption = (e) => {
    let captionValue = e.target.value
    this.setState({
      caption: captionValue
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    let newCategory = this.state.category
    let newCaption = this.state.caption
    let objectId = this.props.id
    this.props.makeEdit(newCaption, objectId, newCategory)
  }

  render(){
    return(
      <div className="edit-form">
        <form action="" onSubmit={this.onSubmit}>
          <input type="text" ref="caption" value={this.state.caption} onChange={this.handleChangeCaption}/>
          <input type="text" ref="category" value={this.state.category} onChange={this.handleChangeCategory}/>
          <button className="form-btn submit-edit">Submit</button>
        </form>
      </div>
    )
  }
}
