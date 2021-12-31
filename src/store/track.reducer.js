const initialState = {
    tracks: null,
    searchHistory: null,
    favoriteTracks: null,
    currSearch: null,
    page: 1,
}
export function trackReducer(state = initialState, action) {
    let newState = state;

    switch (action.type) {
        case 'SET_TRACKS':
            newState = { ...state, tracks: action.tracks }
            break
        case 'SET_SEARCH_HISTORY':
            newState = { ...state, searchHistory: action.searchHistory }
            break
        case 'ADD_SEARCH':
            if (state.currSearch !== action.trackName) {
                newState = { ...state, searchHistory: [action.trackName, ...state.searchHistory], currSearch: action.trackName }
            }
            break
        case 'REMOVE_SEARCH':
            const newSearchHistory = state.searchHistory.filter((str, idx) => idx !== action.searchIdx)
            newState = { ...state, searchHistory: newSearchHistory }
            break
        case 'SET_MY_TRACKS':
            newState = { ...state, favoriteTracks: action.tracks }
            break
        case 'REMOVE_TRACK':
            const tracks = state.favoriteTracks.filter(track => track.key !== action.trackKey)
            newState = { ...state, tracks }
            break
        case 'ADD_TRACK':
            newState = { ...state, favoriteTracks: [...state.favoriteTracks, action.track] }
            break
        case 'CLEAR_MYTRACKS':
            newState = { ...state, favoriteTracks: [] }
            break
        case 'SET_PAGE':
            newState = { ...state, page: action.page }
            break
        default:
    }

    return newState
}
