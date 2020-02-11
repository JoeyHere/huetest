const getBaseEndpoint = () => {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:3000/"
    : "https://api.playhueman.com"
}

const BASE_URL = getBaseEndpoint()
const LEVELS_URL = BASE_URL + "/levels"
const LOGIN_URL = BASE_URL + "/login"
const SIGNUP_URL = BASE_URL + "/signup"
const PROFILE_URL = BASE_URL + "/profile"
const PLAYED_URL = BASE_URL + "/played"
const UPVOTE_URL = BASE_URL + "/upvote"
const DOWNVOTE_URL = BASE_URL + "/downvote"
const COMPLETED_URL = BASE_URL + "/completed"
const MYLEVELS_URL = BASE_URL + "/mylevels"
const PUBLISH_URL = BASE_URL + "/publish"

const handleError = errorObj => {
  let error = containsError(errorObj)
    ? errorObj
    : { message: "Something Went Wrong" }
  if (error.error) {
    alert(`${error.error}`)
  }
}

const containsError = data => "error" in data

const handleApiResponse = data => {
  if (containsError(data)) {
    return Promise.reject(data)
  }
  return data
}

const getLevelFromId = id => {
  const URL = LEVELS_URL + `/${id}`
  const options = {
    method: "GET"
  }
  return fetch(URL, options)
    .then(resp => resp.json())
    .then(handleApiResponse)
    .catch(handleError)
}

const getLevels = () => {
  const options = {
    method: "GET"
  }
  return fetch(LEVELS_URL, options)
    .then(resp => resp.json())
    .then(handleApiResponse)
    .catch(handleError)
}

const getMyLevels = () => {
  return getterFunction(MYLEVELS_URL)
}

const saveLevel = level => {
  return fetch(LEVELS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    body: JSON.stringify(level)
  })
    .then(resp => resp.json())
    .then(handleApiResponse)
    .catch(handleError)
}

const updateLevel = level => {
  return fetch(LEVELS_URL + `/${level.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    body: JSON.stringify(level)
  })
    .then(resp => resp.json())
    .then(handleApiResponse)
    .catch(handleError)
}

const deleteLevel = level => {
  return fetch(LEVELS_URL + `/${level.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    }
  })
    .then(resp => resp.json())
    .then(handleApiResponse)
    .catch(handleError)
}

const playedLevel = levelId => {
  return fetch(PLAYED_URL + `/${levelId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    body: JSON.stringify(levelId)
  })
    .then(resp => resp.json())
    .then(handleApiResponse)
    .catch(handleError)
}

const upvoteLevel = levelId => {
  return fetch(UPVOTE_URL + `/${levelId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    body: JSON.stringify(levelId)
  })
    .then(resp => resp.json())
    .then(handleApiResponse)
    .catch(handleError)
}

const downvoteLevel = levelId => {
  return fetch(DOWNVOTE_URL + `/${levelId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    body: JSON.stringify(levelId)
  })
    .then(resp => resp.json())
    .then(handleApiResponse)
    .catch(handleError)
}

const completedLevel = levelId => {
  return fetch(COMPLETED_URL + `/${levelId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    body: JSON.stringify(levelId)
  })
    .then(resp => resp.json())
    .then(handleApiResponse)
    .catch(handleError)
}

const publishLevel = level => {
  return fetch(PUBLISH_URL + `/${level.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    body: JSON.stringify(level)
  })
    .then(resp => resp.json())
    .then(handleApiResponse)
    .catch(handleError)
}

const loginPost = (user_name, password) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user: {
        user_name: user_name,
        password: password
      }
    })
  }
  return fetch(LOGIN_URL, options)
    .then(resp => resp.json())
    .then(handleApiResponse)
    .catch(handleError)
}

const signUpPost = (user_name, password, email) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user: {
        user_name: user_name,
        password: password,
        email: email
      }
    })
  }
  return fetch(SIGNUP_URL, options)
    .then(resp => resp.json())
    .then(handleApiResponse)
    .catch(handleError)
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
  return fetch(url, options)
    .then(resp => resp.json())
    .then(handleApiResponse)
    .catch(handleError)
}

export default {
  getLevelFromId,
  getLevels,
  saveLevel,
  getProfile,
  loginPost,
  playedLevel,
  completedLevel,
  signUpPost,
  getMyLevels,
  handleError,
  handleApiResponse,
  updateLevel,
  deleteLevel,
  publishLevel,
  upvoteLevel,
  downvoteLevel
}
