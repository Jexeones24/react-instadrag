import React, { Component } from 'react'

const Image = ({ url, caption }) =>
    <div className="image">
      <img src={url} alt={caption}/>
    </div>

export default Image
