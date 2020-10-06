// helper functions
export const getStorage = (key) => {
    if (localStorage.length === 0) return
    return localStorage.getItem(key)
}

export const setStorage = (key, value) => {
    localStorage.setItem(key, value)
}

export default {
    getStorage,
    setStorage
}