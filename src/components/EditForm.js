import React, { Component } from 'react'

export default class EditForm extends Component {
  constructor(props){
    super(props);
  }

  onSubmit = (e) => {
    e.preventDefault()
    debugger
    let newCaption = e.target.childNodes[3].value
    this.props.makeEdit(newCaption)
  }

  render(){
    return(
      <div className="edit-form">
        <form action="" onSubmit={this.onSubmit}>
          Edit Caption: <input type="text" ref="caption"/>
          <button>Submit</button>
        </form>
      </div>
    )
  }
}
