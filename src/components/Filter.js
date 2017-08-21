import React, { Component } from 'react'

export default class Filter extends Component {
  constructor(props){
    super(props);

    this.state = {
      option: ""
    }
  }

  handleChange = (event) => {
    let option = event.target.value
    this.setState({ option: option})
    this.props.changeFilter(option)
  }

  // only filters on first click
  // no duplicate filters added to db
  // check against bad inputs
  render(){
    return(
      <div className="filter">
        <select onChange={this.handleChange}>
          <option value="All">All</option>
          {this.props.options.map((option, i) => <option key={i} value={option.name}>{option.name}</option>)}
        </select>
      </div>
    )
  }
}
