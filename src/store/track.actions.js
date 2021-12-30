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



export function loadFavoriteTracks() {
    return (dispatch) => {
        trackService.query()
            .then(tracks => {
                console.log('tracks from DB:', tracks)
                dispatch({
                    type: 'SET_MY_TRACKS',
                    tracks
                })
            })
            .catch(err => showErrorMsg('Cannot load tracks'))
    }
}

export function addFavoriteTrack(track) {
    return (dispatch) => {
        dispatch({
            type: 'ADD_TRACK',
            track
        })
        showSuccessMsg('Material removed')
    }
}

export function removeFavoriteTrack(trackKey) {
    return (dispatch) => {
        dispatch({
            type: 'REMOVE_TRACK',
            trackKey
        })
    }
}

