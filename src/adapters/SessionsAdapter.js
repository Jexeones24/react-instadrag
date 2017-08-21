
export default class SessionsAdapter {

  static getUser(user){
    console.log("in SessionsAdapter");
    return fetch(`http://localhost:3000/api/v1/users/${user.id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: `${user.username}`,
        password: `${user.password}`,
      })
    })
      .then( resp => resp.json())
  }
}
