
import axios from 'axios'


const baseUrl = 'https://fso-part4-7dym.onrender.com/api/blogs'


const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export default {getAll, getById}
