import { localstorageService } from './localstorage.service.js'

export const trackService = {
    query,
    add,
    remove,
}

const KEY = 'userDB'

function query() {
    const user = localstorageService.loadFromStorage(KEY) || {}
    return user.favorites
}

function add(track) {
    const user = localstorageService.loadFromStorage(KEY) || {}
    if (!user.favorites) user.favorites = []
    user.favorites.unshift(track)
    localstorageService.saveToStorage(KEY, user)

}

function remove(trackId) {
    let user = localstorageService.loadFromStorage(KEY)
    user.favorites = user.favorites.filter(favTrack => favTrack.key !== trackId)
    localstorageService.saveToStorage(KEY, user)
}