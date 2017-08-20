import React, { Component } from 'react'
import EditForm from './EditForm'
import { Grid } from 'semantic-ui-react'
import Draggable from 'react-draggable'; // The default


const Image = (props) => {
  const onDelete = () => props.deleteImg(props)
  const onEdit = () => props.editImg(props)

  return (
    <Draggable>
      <Grid.Column>
          <div className="image">
            <div className="inner-image">
                <div className="overlay">
                  <button onClick={onEdit}><i className="material-icons hover-icon">create</i></button>
                  <button onClick={onDelete}> <i className="material-icons hover-icon">delete</i></button>
                </div>
                <img src={props.url} alt={props.caption}/>
                <h3>Caption: {props.caption}</h3>
              </div>
          </div>
      </Grid.Column>
    </Draggable>
  )
}

export default Image
