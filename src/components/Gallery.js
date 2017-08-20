import React, { Component } from 'react'
import Image from './Image'

export default class Gallery extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="gallery">
        {this.props.allImages.map((img, i) => <Image id={img.id} key={i} url={img.url} caption={img.caption} deleteImg={this.props.deleteImg}/>)}
      </div>
    )
  }
}
