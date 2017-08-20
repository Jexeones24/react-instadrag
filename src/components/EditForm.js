import React, { Component } from 'react'

export default class EditForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      newCaption: ""
    }
  }

  handleEdit = (e) => {
    this.setState({ newCaption: e.target.value })
    console.log(this.state.newCaption)
  }

  onSubmit = (e) => {
    e.preventDefault()
    let newCaption = this.state.newCaption
    this.props.makeEdit(newCaption) //need to pass image url
  }

  render(){
    return(
      <div className="edit-form">
        <form action="">
          Edit Caption: <input type="text" ref="caption" onChange={this.handleEdit} value={this.state.newCaption}/>
          <button onClick={this.onSubmit}>Submit</button>
        </form>
      </div>
    )
  }
}
