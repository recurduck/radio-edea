import { trackService } from '../services/track.service'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { searchService } from '../services/search.service'

export function loadTracks(trackName) {
    return (dispatch) => {
        searchService.search(trackName)
            .then(tracks => {
                dispatch({
                    type: 'SET_TRACKS',
                    tracks
                })
            })
            .catch(err => showErrorMsg('Unable to search tracks'))
            .then(() => {
                dispatch({
                    type: 'ADD_SEARCH',
                    trackName
                })
            })
            .then(() => {
                dispatch({
                    type: 'SET_PAGE',
                    page: 1
                })
            })
    }
}

export function loadSearchHistory() {
    return (dispatch) => {
        const searchHistory = searchService.query() || []
        dispatch({
            type: 'SET_SEARCH_HISTORY',
            searchHistory
        })
    }
}

export function removeSearchTrack(searchIdx) {
    return (dispatch) => {
        searchService.remove(searchIdx)
        dispatch({
            type: 'REMOVE_SEARCH',
            searchIdx
        })
    }
}

export function setPage(page) {
    return (dispatch) => {
        dispatch({
            type: 'SET_PAGE',
            page
        })
    }
}

export function loadFavoriteTracks() {
    return (dispatch) => {
        const tracks = trackService.query() || []
        return dispatch({
            type: 'SET_MY_TRACKS',
            tracks
        })
    }
}

export function addFavoriteTrack(track) {
    return (dispatch) => {
        trackService.add(track)
        dispatch({
            type: 'ADD_TRACK',
            track
        })
        showSuccessMsg('Track added to Favorites')
    }
}

export function removeFavoriteTrack(trackKey) {
    return (dispatch) => {
        trackService.remove(trackKey)
        dispatch({
            type: 'REMOVE_TRACK',
            trackKey
        })
        showSuccessMsg('Track have been removed from Favorites')
    }
}

