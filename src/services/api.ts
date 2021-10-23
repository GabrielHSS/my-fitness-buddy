import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.nal.usda.gov/fdc/v1',
  params: {
    api_key: 'jD1yz3SwdkvbJwqoOuMstVdfcFDvKDqOQJ59vXxP'
  }
})

export default api
