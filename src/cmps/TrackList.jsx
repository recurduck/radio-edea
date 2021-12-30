import TrackPreview from './TrackPreview.jsx'
export default function TrackList({ tracks, displayList = true }) {
    return (
        <div className={`tracks-container flex pb-3 ${displayList ? 'column' : 'wrap'}`}>
            {tracks?.length > 0 ?
                tracks.map(track => <TrackPreview key={track.key} track={track} displayList={displayList} />) :
                <h1>No Tracks try to search somthing</h1>
            }
        </div>
    )
}