import React, { Component } from 'react'

export default class EditForm extends Component {
  constructor(props){
    super(props);

    this.state ={
      caption: this.props.caption
    }
  }

  handleChange = (e) => {
    let newValue = e.target.value
    console.log(newValue)
    this.setState({
      caption: newValue
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    let newCaption = this.state.caption
    let objectId = this.props.id
    this.props.makeEdit(newCaption, objectId)
  }

  render(){
    return(
      <div className="edit-form">
        <form action="" onSubmit={this.onSubmit}>
          <input type="text" ref="caption" value={this.state.caption} onChange={this.handleChange}/>
          <button className="form-btn submit-edit">Submit</button>
        </form>
      </div>
    )
  }
}
