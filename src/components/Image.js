import React, { Component } from 'react'
import EditForm from './EditForm'
import { Grid } from 'semantic-ui-react'
import Draggable from 'react-draggable'; // The default


const Image = (props) => {
  const onDelete = () => props.deleteImg(props)

  return (
    <Draggable>
      <Grid.Column>
          <div className="image">
            <div className="inner-image">
                <div className="overlay">
                  <button><i className="material-icons hover-icon">create</i></button>
                  <button onClick={onDelete}> <i className="material-icons hover-icon">delete</i></button>
                </div>
                <img src={props.url} alt={props.caption}/>
                <h3>Caption: {props.caption}</h3>
                <EditForm id={props.id} caption={props.caption} makeEdit={props.makeEdit}/>
            </div>
          </div>
      </Grid.Column>
    </Draggable>
  )
}

export default Image
