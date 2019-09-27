import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newPerson) => {
  const request = axios.post(baseUrl, newPerson)
  return request.then(response => response.data)
}

const remove = (id) => {
  const resourceURL = `${baseUrl}/${id}`
  return axios.delete(resourceURL)
}

const update = (id, newPerson) => {
  const resourceURL = `${baseUrl}/${id}`
  const request = axios.put(resourceURL, newPerson)
  return request.then(response => response.data)
}

export default { getAll, create, remove, update }