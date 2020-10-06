import gsap from 'gsap'
import { getStorage, setStorage } from './storage'
import weather from './weather'

export const showUnits = (type) => {
    if (getStorage('showUnits') === 'true') {
        switch (type) {
            case 'wind':
                return ' ms'
            case 'humidity':
                return ' %'
            case 'pressure':
                return ' hPa'
            default:
                return null
        }
    } else {
        return ''
    }
}

export const checkCity = () => {
    if (getStorage('city')) {
        return getStorage('city')
    } else {
        return 'gdańsk'
    }
}

export const animateAndUpdate = (array, type, ...updateFn) => {
    if (type === 'in') {
        let delay = 1
        array.forEach(element => {
            gsap.to(`.${element}`, {
                delay,
                ease: 'power4.out',
                opacity: 1,
                duration: .5,
            })
            delay += .75
        })
        if (updateFn) { updateFn } else { return }
    } else if (type === 'out') {
        array.forEach(element => {
            gsap.to(`.${element}`, {
                opacity: 0,
                duration: .5,
            })
        })
        if (updateFn) { updateFn } else { return }
    }
}

export const update = () => {
    try {
        const elms = document.getElementsByName('tert')
        const image = document.getElementById('mid-image')
        weather.get().then((data) => {
            // update dashboard
            const reuslts = data.data
            elms[0].innerText = reuslts.name // name
            elms[1].innerText = reuslts.weather[0].description // description
            elms[2].innerText = `${Math.floor(reuslts.main.temp_min)}°` // temp min
            elms[3].innerText = `${Math.floor(reuslts.main.temp)}°` // temp current
            elms[4].innerText = `${Math.floor(reuslts.main.temp_max)}°` // temp max
            elms[5].innerHTML = `<p>${reuslts.wind.speed}</p><p>${showUnits('wind')}</p>` // wind
            elms[6].innerHTML = `<p>${reuslts.main.humidity}</p><p>${showUnits('humidity')}</p>` // humidity
            elms[7].innerHTML = `<p>${reuslts.main.pressure}</p><p>${showUnits('pressure')}</p>` // pressure
            // update photo
            image.src = `http://openweathermap.org/img/wn/${reuslts.weather[0].icon}@4x.png`
        })
    } catch (error) {
        console.log(error)
    }
}

export const hiddenElements = [
    document.getElementsByClassName('top-description')[0].className,
    document.getElementsByClassName('mid')[0].className,
    document.getElementsByClassName('bottom')[0].className,
]

// export default section
export default {
    showUnits,
    checkCity,
    animateAndUpdate,
    hiddenElements,
}