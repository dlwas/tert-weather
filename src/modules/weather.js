import axios from 'axios'
import { getStorage } from './storage'

// export functions sections
export const get = () => {
    return new Promise((resolve, reject) => {
        const config = {
            base: 'https://api.openweathermap.org/data/2.5/weather?',
            city: getStorage('city'),
            units: getStorage('units')
        }
        const results = axios.get(`${config.base}q=${config.city}&units=${config.units}&appid=a76c4ea75e3725b83e65d21eeb6b1102`)
        resolve(results)
    })
}

// export default section
export default {
    get
}