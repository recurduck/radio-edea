import TrackPreview from './TrackPreview.jsx'
import { useSelector } from 'react-redux'

export default function TrackFavorite({ displayList = true }) {
    const { favoriteTracks } = useSelector(state => state.trackModule)

    return (
        <div className={`favorite-tracks flex align-center pb-3 ${displayList ? 'column' : ''}`}>
            <h2>My Favorite Tracks</h2>
            <h3>coming soon</h3>
            {favoriteTracks && favoriteTracks.map(track => <TrackPreview key={track.key} track={track} displayList={displayList} />)}
        </div>
    )
}