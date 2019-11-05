import axios from 'axios'

export default axios.create({
    baseURL: 'https://backend-mysql-kumis.herokuapp.com/'
})