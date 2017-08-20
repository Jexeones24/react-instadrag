import React, { Component } from 'react'

const Image = (props) => {
  const onDelete = () => props.deleteImg(props)

  return (
    <div className="image">
      <img src={props.url} alt={props.caption}/>
      <h3>Caption: {props.caption}</h3>
      <button onClick={onDelete}>Delete</button>
    </div>
  )
}

export default Image
