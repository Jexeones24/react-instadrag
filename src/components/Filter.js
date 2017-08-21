import React, { Component } from 'react'

export default class Filter extends Component {
  constructor(props){
    super(props);

  }


  render(){
    return(
      <div>
        <form>
          <select onChange={this.props.selectValueHandleChange}>
            <option disabled selected>Choose a Filter </option>
            <option>Both</option>
            <option>Category</option>
            <option>Caption</option>
          </select>
          <input type="text" onChange={this.props.handleChange}/>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}
