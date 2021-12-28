import axios from 'axios'
import { localstorageService } from './async-storage.service.js'

export const searchService = {
    search,
    getById,
    getEmbedById,
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

async function getEmbedById(trackId) {
    const url = `https://api.mixcloud.com${trackId}embed-html/?width=100%`
    return await (await axios.get(url)).data
}

async function query() {
    return (await localstorageService.loadFromStorage(KEY)).searchHistory
}

async function remove(searchIdx) {
    let user = await localstorageService.loadFromStorage(KEY)
    user.searchHistory.splice(searchIdx, 1)
    localstorageService.saveToStorage(KEY, user)
}

async function _addSearchHistory(trackName) {
    let user = await localstorageService.loadFromStorage(KEY)
    if (user.searchHistory[0] !== trackName) user.searchHistory.unshift(trackName)
    localstorageService.saveToStorage(KEY, user)
}
