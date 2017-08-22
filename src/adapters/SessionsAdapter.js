const path = 'http://localhost:3000/api/v1/sessions'
export default class SessionsAdapter {

  static getUser(formData){
    return fetch('http://localhost:3000/api/v1/sessions', {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(formData)
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
