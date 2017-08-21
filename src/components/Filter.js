import React, { Component } from 'react'

export default class Filter extends Component {
  constructor(props){
    super(props);

  }

  selectChange = () => {

  }

  submitForm = (e) => {
    e.preventDefault()
    let selectValue = e.target.childNodes[0].value
    let inputValue = e.target.childNodes[1].value
    this.props.filterImg(selectValue, inputValue)
  }

  render(){
    return(
      <div>
        <form onSubmit={this.submitForm}>
          <select onChange={this.selectChange}>
            <option>Both</option>
            <option>Category</option>
            <option>Caption</option>
          </select>
          <input type="text"/>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}
