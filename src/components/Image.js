import React, { Component } from 'react'
import EditForm from './EditForm'
import { Grid } from 'semantic-ui-react'
import Draggable from 'react-draggable'; // The default


export default class Image extends Component {
  constructor(props){
    super(props);

    this.state ={
      formVisible: false

    }
  }

  onDelete = () => this.props.deleteImg(this.props)
  showForm = () => this.setState({formVisible: !this.state.formVisible})

  render() {
    return (
      <Draggable>
        <Grid.Column>
            <div className="image">
              <div className="inner-image">
                  <div className="overlay">
                    <button onClick={this.showForm}><i className="material-icons hover-icon">create</i></button>
                    <button onClick={this.onDelete}> <i className="material-icons hover-icon">delete</i></button>
                  </div>
                  <img src={this.props.url} alt={this.props.caption}/>
                  <h3>Caption: {this.props.caption}</h3>
                  <h3> Category: {this.props.category} </h3>
                  {
                    this.state.formVisible
                    ? <EditForm id={this.props.id} caption={this.props.caption} category={this.props.category} makeEdit={this.props.makeEdit}/>
                    : null
                  }
              </div>
            </div>
        </Grid.Column>
      </Draggable>
      )
    }
}
