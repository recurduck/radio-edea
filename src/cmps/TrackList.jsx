import TrackPreview from './TrackPreview.jsx'
export default function TrackList({ tracks, displayList = true }) {
    return (
        <div className={`tracks-container container flex ${displayList ? 'column' : ''}`}>
            {tracks.map(track => <TrackPreview key={track.key} track={track} displayList={displayList} />)}
        </div>
    )
}