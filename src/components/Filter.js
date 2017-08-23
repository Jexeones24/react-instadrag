import React, { Component } from 'react'

export default class Filter extends Component {
  constructor(props){
    super(props);
  }


  render(){
    return(
      <div>
        <form>
          <h5 className="left pl-10"> Filter </h5>
          <select onChange={this.props.selectValueHandleChange}>
            <option disabled selected>Choose a Filter </option>
            <option>Both</option>
            <option>Category</option>
            <option>Caption</option>
          </select>
          <input type="text" onChange={this.props.handleChange}/>
          <button className="form-btn submit-edit" type="submit">Submit</button>
        </form>
      </div>
    )
  }
}
