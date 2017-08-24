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
    console.log("Gimme those tokens", headers())
    return fetch(`${path}/current_user`, {
      method: 'GET',
      headers: headers()
    })
      .then(res=> {
        console.log(headers())
        console.log(localStorage.getItem('token'))
        return res.json()
      })
  }
}

let headers = () => {
  const token = localStorage.getItem('token')
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}
