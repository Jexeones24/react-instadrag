import React, { Component } from 'react'
import EditForm from './EditForm'

const Image = (props) => {
  const onDelete = () => props.deleteImg(props)
  const onEdit = () => props.editImg(props)

  return (
    <div className="image">
      <img src={props.url} alt={props.caption}/>
      <h3>Caption: {props.caption}</h3>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  )
}

export default Image
