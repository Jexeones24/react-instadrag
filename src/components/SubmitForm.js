import React, { Component } from 'react'

export default class SubmitForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      url: "",
      caption: ""
    }
  }

  setUrl = (e) => {
    let url = e.target.value
    this.setState({ url })
  }

  setCaption = (e) => {
    let caption = e.target.value
    this.setState({ caption })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const url = this.state.url
    const caption = this.state.caption
    this.props.makeImg(url, caption)
    this.refs.url.value = "";
    this.refs.caption.value = "";
  }

  render(){
    return(
      <div className="form">
        <form className="url-caption" onSubmit={this.handleSubmit}>
        URL: <input type="text" ref="url" value={this.state.url} onChange={this.setUrl}/>
        CAPTION: <input type="text" ref="caption" value={this.state.caption} onChange={this.setCaption}/>
        <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}
