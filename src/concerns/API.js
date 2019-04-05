const getLevelFromId = id => {
  const API = `http://localhost:3000/levels/${id}`
  return fetch(API).then(res => res.json())
}

export default {
  getLevelFromId
}
