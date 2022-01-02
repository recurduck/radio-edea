import { useSelector } from 'react-redux'

import TrackPreview from './TrackPreview.jsx'

export default function TrackList({ tracks, displayList = true, count = 6 }) {
    const { page } = useSelector(state => state.trackModule)

    return (
        <div className={`tracks-container flex pb-3 ${displayList ? 'column list' : 'wrap gap-20 tails'}`}>
            {tracks?.length > 0 ?
                tracks.slice((page - 1) * count, page * count).map(track => <TrackPreview key={track.key} track={track} displayList={displayList} />) :
                <h1>No Tracks try to search somthing</h1>
            }
        </div>
    )
}