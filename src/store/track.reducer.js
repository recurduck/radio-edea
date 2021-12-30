const initialState = {
    tracks: null,
    searchHistory: null,
    favoriteTracks: null,
    currSearch: null
}
export function trackReducer(state = initialState, action) {
    var newState = state
    var tracks
    switch (action.type) {
        case 'SET_TRACKS':
            newState = { ...state, tracks: action.tracks }
            break
        case 'SET_SEARCH_HISTORY':
            newState = { ...state, searchHistory: action.searchHistory }
            break
        case 'ADD_SEARCH':
            if (state.currSearch !== action.trackName)
                newState = { ...state, searchHistory: [action.trackName, ...state.searchHistory], currSearch: action.currSearch }
            break
        case 'REMOVE_SEARCH':
            var newSearchHistory = state.searchHistory.filter((str, idx) => idx !== action.searchIdx)
            newState = { ...state, searchHistory: newSearchHistory }
            break
        case 'SET_MY_TRACKS':
            newState = { ...state, favoriteTracks: action.tracks }
            break
        case 'REMOVE_TRACK':
            tracks = state.favoriteTracks.filter(track => track.key !== action.trackKey)
            newState = { ...state, tracks }
            break
        case 'ADD_TRACK':
            newState = { ...state, favoriteTracks: [...state.favoriteTracks, action.track] }
            break
        case 'CLEAR_MYTRACKS':
            newState = { ...state, favoriteTracks: [] }
            break
        default:
    }
    // For debug:
    // window.materialState = newState
    // console.log('Prev State:', state)
    // console.log('Action:', action)
    // console.log('New State:', newState)
    return newState
}
