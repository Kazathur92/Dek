const remoteURL = "http://localhost:5002";

export default {
  get(id) {
    return fetch(`${remoteURL}/users/${id}`).then(e => e.json());
  },
  getAll() {
    return fetch(`${remoteURL}/users`).then(e => e.json());
  },
  getUserSpecific(sessionId){
    return fetch(`${remoteURL}/users/${sessionId}`).then(e => e.json());
  },


checkUser(email, name) {

    return fetch(`http://localhost:5002/users?email=${email}&name=${name}`).then(e => e.json())
  }
}
