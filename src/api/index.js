  
import axios from 'axios'

const HTTP = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
})


export { HTTP as default }