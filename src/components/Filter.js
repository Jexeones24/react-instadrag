import React, { Component } from 'react'

export default class Filter extends Component {
  debugger
  constructor(){
    super();

    this.state = {
      option: ""
    }
  }

  handleChange = (event) => {
    let option = event.target.value
    this.setState({ option: option})
    this.props.changeFilter(option)
  }

  render(){
    return(
      <div className="filter">
        <select onChange={this.handleChange}>
          {this.props.options.map((option, i) => <option key={i} value={option}>{option}</option>)}
        </select>
      </div>
    )
  }
}
