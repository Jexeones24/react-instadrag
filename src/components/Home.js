import React from 'react'
import Main from './Main'
import Login from './Login'
import {Redirect} from 'react-router'


export default class Home extends React.Component {

  constructor() {
    super()
  }

  componentWillReceiveProps(props) {
    {props.loggedIn ? props.history.push('main') : props.history.push('login')}
  }

  render() {
    return(
      <div>
        Home
      </div>
    )
  }
}
