import TrackPreview from './TrackPreview.jsx'
import { useSelector } from 'react-redux'

export default function TrackFavorite({ tracks, displayList = true }) {
    const { favoriteTracks } = useSelector(state => state.trackModule)

    return (
        <div className={`favorite-tracks flex pb-3 ${displayList ? 'column' : ''}`}>
            <h2>My Favorite Tracks</h2>
            {favoriteTracks && favoriteTracks.map(track => <TrackPreview key={track.key} track={track} displayList={displayList} />)}
        </div>
    )
}