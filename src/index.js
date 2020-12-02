import { animateAndUpdate, update, hiddenElements, checkCity } from './modules/utility'
import { setStorage, getStorage } from './modules/storage'

import './styles/index.scss'

const init = () => {
    setStorage('units', 'metric')
    setStorage('showUnits', 'false')
    setStorage('autoUpdate', '3600000')
}

init()

const topName = document.getElementById('top-name')
let firstUpdate = null

topName.addEventListener('click', () => {
    let topInput = null
    topName.innerHTML = `<input type="text" 
                            id="top-name-input" 
                            class="top-name" onfocus="let value = this.value; this.value = null; this.value=value" 
                            value="${checkCity()}">`
    topInput = document.getElementById('top-name-input')
    topInput.focus()

    topInput.addEventListener('keyup', (e) => {
        if (e.key == 'Enter') {
            setStorage('city', topInput.value.toString())

            animateAndUpdate(hiddenElements, 'out', update())

            animateAndUpdate(hiddenElements, 'in', update())

            setInterval(() => {
                update()
                console.log('updated')
            }, parseInt(getStorage('autoUpdate')))
        }
    })
})