const path = 'http://localhost:3000/api/v1/users'

export default class UsersAdapter {

  static createUser(user) {
    return fetch(path, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        username: `${user.username}`,
        email: `${user.email}`,
        password: `${user.password}`
      })
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
