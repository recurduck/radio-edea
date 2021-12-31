import axios from 'axios'
import { localstorageService } from './localstorage.service.js'

export const searchService = {
    search,
    getById,
    query,
    remove,
    setPreference,
    getPreference
}

const KEY = 'userDB'

async function search(trackName) {
    const url = `https://api.mixcloud.com/search/?limit=40&offset=0&q=${trackName}&type=cloudcast`
    _addSearchHistory(trackName)
    return (await axios.get(url)).data
}

async function getById(trackId) {
    const url = `https://api.mixcloud.com${trackId}`
    return (await axios.get(url)).data
}

function query() {
    const user = localstorageService.loadFromStorage(KEY) || {}
    return user.searchHistory
}

function remove(searchIdx) {
    const user = localstorageService.loadFromStorage(KEY)
    user.searchHistory.splice(searchIdx, 1)
    localstorageService.saveToStorage(KEY, user)
}

function setPreference(pref) {
    const user = localstorageService.loadFromStorage(KEY) || {}
    user.isPrefList = pref
    localstorageService.saveToStorage(KEY, user)
}

function getPreference() {
    const user = localstorageService.loadFromStorage(KEY) || {}
    return user.isPrefList
}

function _addSearchHistory(trackName) {
    console.log(trackName)
    const user = localstorageService.loadFromStorage(KEY) || {}
    if (!user.searchHistory) user.searchHistory = []
    if (user.searchHistory[0] !== trackName) user.searchHistory.unshift(trackName)
    localstorageService.saveToStorage(KEY, user)
}
