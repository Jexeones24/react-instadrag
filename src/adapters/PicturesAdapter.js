const path = 'http://localhost:3000/api/v1/pictures'

export default class PicturesAdapter {

  static getPictures() {

    return fetch(path, {
      headers: headers()
    })
      .then( resp => resp.json())
    }

    static makeImg(url, caption, category) {
      return fetch(path, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({
          url: `${url}`,
          caption: `${caption}`,
          category: `${category}`
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

    static makeEdit(newCaption, objId, category) {
      return fetch(`http://localhost:3000/api/v1/pictures/${objId}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          caption: `${newCaption}`,
          category: `${category}`
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
