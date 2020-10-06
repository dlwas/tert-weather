import axios from 'axios'
import { getStorage } from './storage'

// export functions sections
export const get = () => {
    return new Promise((resolve, reject) => {
        const config = {
            base: 'http://api.openweathermap.org/data/2.5/weather?',
            city: getStorage('city'),
            units: getStorage('units')
        }
        const results = axios.get(`${config.base}q=${config.city}&units=${config.units}&appid=${process.env.API_KEY}`)
        resolve(results)
    })
}

// export default section
export default {
    get
}