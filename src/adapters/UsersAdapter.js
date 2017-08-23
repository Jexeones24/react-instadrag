const path = 'http://localhost:3000/api/v1/users'

export default class UsersAdapter {

  static createUser(user) {
    // debugger
    return fetch(path, {
      method: 'post',
      headers: headers(),
      body: JSON.stringify({user:user})
    })
    .then( resp => resp.json())
  }

}

let headers = () => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}
