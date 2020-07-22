import axios from 'axios'

const api = axios.create({
    baseURL: 'https://3333-a7e74c83-8fb8-4d28-bff6-25676817e7dd.ws-us02.gitpod.io'
})

export default api