const BASE_URL = "http://localhost:3000"
const LEVELS_URL = BASE_URL + "/levels"
const LOGIN_URL = BASE_URL + "/login"
const PROFILE_URL = BASE_URL + "/profile"

const getLevelFromId = id => {
  const URL = LEVELS_URL + `/${id}`
  return fetch(URL).then(res => res.json())
}

const getLevels = () => {
  return getterFunction(LEVELS_URL)
}

const saveLevel = level => {
  return fetch(LEVELS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(level)
  }).then(resp => resp.json())
}
export default {
  getLevelFromId,
  getLevels,
  saveLevel
}

const loginPost = (user_name, password) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      user: {
        user_name: user_name,
        password: password
      }
    })
  }
  return fetch(LOGIN_URL, options).then(resp => resp.json())
}

const getProfile = () => {
  return getterFunction(PROFILE_URL)
}

const getterFunction = url => {
  const options = {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("token")
    }
  }
  return fetch(url, options).then(resp => resp.json())
}
