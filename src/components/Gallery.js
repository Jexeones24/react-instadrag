import React, { Component } from 'react'
import Image from './Image'
import EditForm from './EditForm'

export default class Gallery extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="three column row">
        <div className="gallery">
            {this.props.allImages.map((img, i) => <Image id={img.id} key={i} url={img.url} makeEdit={this.props.makeEdit} caption={img.caption}
            category={img.category} deleteImg={this.props.deleteImg} />)}
        </div>
    </div>
    )
  }
}
