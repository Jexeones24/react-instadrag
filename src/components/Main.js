import React from 'react'
import SubmitForm from './SubmitForm'
import Filter from './Filter'
import Gallery from './Gallery'

export default class Main extends React.Component {

    constructor() {
      super()
    }

    componentWillReceiveProps(props) {
      {props.loggedIn ? props.history.push('main') : props.history.push('login')}
    }

  render(){
    return (
      <div>
        <div className="ui celled grid">
          <div className="row">
            <SubmitForm makeImg={this.props.makeImg}/>
            <Filter handleChange={this.props.handleChange} selectValueHandleChange={this.props.selectValueHandleChange}/>
          </div>
        </div>
        <div className="ui celled grid">
          <Gallery
            allImages={this.props.filterImg()} deleteImg={this.props.deleteImg} makeEdit={this.props.makeEdit}/>
        </div>
        <div className="grid">
          <button className="form-btn submit-edit" onClick={this.props.logOut}>
            Logout
          </button>

        </div>
      </div>
    )
  }
}
