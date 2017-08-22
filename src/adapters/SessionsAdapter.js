const path = 'http://localhost:3000/api/v1/sessions'
export default class SessionsAdapter {

  static getUser(formData){
    return fetch(path, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(formData)
    })
    .then( resp => resp.json())
  }

  static currentUser(){
    return fetch(`${path}/current_user`, {
      method: 'GET',
      headers: headers()
    })
      .then(res=> res.json())
  }
}

let headers = () => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }
}
