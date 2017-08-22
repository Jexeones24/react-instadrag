const path = 'http://localhost:3000/api/v1/pictures'

export default class PicturesAdapter {

  static getPictures() {

    return fetch(path, {
      headers: headers()
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
