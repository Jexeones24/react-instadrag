import React, { Component } from 'react'

export default class EditForm extends Component {
  constructor(props){
    super(props);

    this.state ={
      caption: this.props.caption,
      category: this.props.category,
      imageid: this.props.id
    }
  }

  handleChange = (e) => {
    let value = e.target.value
    let property = e.target.name
    this.setState({
      [property]:value
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.makeEdit(this.state)
  }

  render(){
    return(
      <div className="edit-form">
        <form action="" onSubmit={this.onSubmit}>
          <input type="text" ref="caption" value={this.state.caption} onChange={this.handleChange} name="caption"/>
          <input type="text" ref="category" name="category" value={this.state.category} onChange={this.handleChange}/>
          <button className="form-btn submit-edit">Submit</button>
        </form>
      </div>
    )
  }
}
