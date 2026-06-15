import axios from 'axios'

const baseUrl = 'https://fso-part4-7dym.onrender.com/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}


const getConfig = () => ({
  headers: {
    Authorization: token,
  },
})


const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}


const create = async (newObject) => {
  const response = await axios.post(
    baseUrl,
    newObject,
    getConfig()
  )

  return response.data
}


const update = async (id, updatedObject) => {
  const response = await axios.put(
    `${baseUrl}/${id}`,
    updatedObject,
    getConfig()
  )

  return response.data
}


const remove = async (id) => {
  const response = await axios.delete(
    `${baseUrl}/${id}`,
    getConfig()
  )

  return response.data
}

export default {getAll, create, update, remove, setToken, getConfig }
