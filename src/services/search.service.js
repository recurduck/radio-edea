import axios from 'axios'
import { localstorageService } from './localstorage.service.js'

export const searchService = {
    search,
    getById,
    clear,
    query,
    remove,
}

const KEY = 'userDB'

async function search(trackName, pagination) {
    const url = pagination ? pagination : `https://api.mixcloud.com/search/?limit=6&offset=0&q=${trackName}&type=cloudcast`
    if (!pagination) _addSearchHistory(trackName)
    return await (await axios.get(url)).data
}

async function getById(trackId) {
    const url = `https://api.mixcloud.com${trackId}`
    return await (await axios.get(url)).data
}

function query() {
    const user = localstorageService.loadFromStorage(KEY) || {}
    return user.searchHistory
}

function remove(searchIdx) {
    let user = localstorageService.loadFromStorage(KEY)
    user.searchHistory.splice(searchIdx, 1)
    localstorageService.saveToStorage(KEY, user)
}

function clear() {
    let user = localstorageService.loadFromStorage(KEY)
    user.searchHistory = []
    localstorageService.saveToStorage(KEY, user)
}

function _addSearchHistory(trackName) {
    let user = localstorageService.loadFromStorage(KEY) || {}
    if(!user.searchHistory) user.searchHistory = []
    if (user.searchHistory[0] !== trackName) user.searchHistory.unshift(trackName)
    localstorageService.saveToStorage(KEY, user)
}
