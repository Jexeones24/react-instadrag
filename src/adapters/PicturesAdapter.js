const path = 'http://localhost:3000/api/v1/pictures'

export default class PicturesAdapter {

  static getPictures() {

    return fetch(path, {
      headers: headers()
    })
      .then( resp => resp.json())
    }

    static makeImg(img) {
      return fetch(path, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({
          url: `${img.url}`,
          caption: `${img.caption}`,
          category: `${img.category}`
        })
      })
      .then( resp => resp.json())
    }


    static deleteImg(img) {
      return fetch(`http://localhost:3000/api/v1/pictures/${img.id}`, {
        method: 'DELETE',
        headers: headers(),
        body: JSON.stringify({
          url: `${img.url}`,
          caption: `${img.caption}`,
          category: `${img.category}`
        })
      })
      .then( resp => resp.json())
    }

    static makeEdit(img) {
      return fetch(`http://localhost:3000/api/v1/pictures/${img.imageid}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          caption: `${img.caption}`,
          category: `${img.category}`
        })
      })
      .then( resp => resp.json())
    }

}

let headers = () => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }
}
