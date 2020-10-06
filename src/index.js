import weather from './modules/weather'
import {
    setStorage,
    getStorage
} from './modules/storage'
import gsap from 'gsap'

// import style
import './styles/index.scss'

const init = () => {
    // set default value
    setStorage('city', 'gdańsk')
    setStorage('units', 'metric')
    setStorage('showUnits', 'false')
}

init()

const elms = document.getElementsByName('tert')
const image = document.getElementById('mid-image')
const topName = document.getElementById('top-name')
let topInput = null

let hiddenElements = [
    document.getElementsByClassName('top-description')[0].className,
    document.getElementsByClassName('mid')[0].className,
    document.getElementsByClassName('bottom')[0].className,
]

const showUnits = (type) => {
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

const animate = (array) => {
    let delay = 1
    array.forEach(element => {
        gsap.to(`.${element}`, {
            delay,
            ease: 'power4.out',
            opacity: 1,
            duration: .6,
        })
        delay += .4
    })
}

const update = () => {
    weather.get().then((data) => {
        // update dashboard
        const reuslts = data.data
        elms[0].innerText = reuslts.name // name
        elms[1].innerText = reuslts.weather[0].description // description
        elms[2].innerText = `${Math.floor(reuslts.main.temp_min)}°` // temp min
        elms[3].innerText = `${Math.floor(reuslts.main.temp)}°` // temp current
        elms[4].innerText = `${Math.floor(reuslts.main.temp_max)}°` // temp max
        elms[5].innerText = `${reuslts.wind.speed}${showUnits('wind')}` // wind
        elms[6].innerText = `${reuslts.main.humidity}${showUnits('humidity')}` // humidity
        elms[7].innerText = `${reuslts.main.pressure}${showUnits('pressure')}` // pressure
        // update photo
        image.src = `http://openweathermap.org/img/wn/${reuslts.weather[0].icon}@4x.png`
    })
}

topName.addEventListener('click', () => {
    // inject input
    topName.innerHTML = `<input type="text" id="top-name-input" class="top-name" onfocus="let value = this.value; this.value = null; this.value=value" value="${getStorage('city')}">`
    // register input
    topInput = document.getElementById('top-name-input')
    // focus input
    topInput.focus()

    topInput.addEventListener('keyup', (e) => {
        if (e.key == 'Enter') {
            // set city
            setStorage('city', topInput.value.toString())
            // update
            update()
            // show
            animate(hiddenElements)
        }
    })
})