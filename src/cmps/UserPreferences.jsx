import SearchHistoryList from './SearchHistoryList'
import TrackFavorite from './TrackFavorite'

export default function UserPreferences() {
    return (
        <div className='searches-history'>
            <SearchHistoryList />
            <TrackFavorite />
        </div>
    )
}