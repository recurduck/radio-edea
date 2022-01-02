import { useSelector } from 'react-redux'

import TrackPreview from './TrackPreview.jsx'

export default function TrackFavorite({ displayList = true, isHistoryShow, favorite=false, numDisplay=Infinity }) {
    const { favoriteTracks } = useSelector(state => state.trackModule)
    
    return (
        <div className='favorite-tracks flex justify-center pb-3 column'>
            <h2>My Favorite Tracks</h2>
            <div className={`favorite-tracks-list flex justify-center pb-3 ${displayList ? 'column' : ''} wrap  ${isHistoryShow ? 'reduce' : ''}`}>
                {favoriteTracks && favoriteTracks.slice(0, numDisplay).map(track => <TrackPreview key={track.key} track={track} displayList={displayList} favorite={favorite}/>)}
            </div>
        </div>
    )
}