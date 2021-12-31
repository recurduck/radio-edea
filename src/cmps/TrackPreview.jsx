import headphones from '../assets/icons/headphones.svg'
import duration from '../assets/icons/duration.svg'
import QueryNavLink from './QueryNavLink'
import { useState } from 'react'
export default function TrackPreview({ track, displayList }) {
    const [isLoadTrack, setIsLoadTrack] = useState(null)
    const formatToDuration = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toGMTString().match(/([\d]+:){2}[\d]+/)[0]
    }

    const formatToDate = (timestamp) => {
        return timestamp.match(/([\d]+-){2}[\d]+/)[0]
    }

    return (
        <QueryNavLink to={`/library/${track.key.replaceAll('/', '~')}`}
            className={`track-card flex ${displayList ? 'list ' : 'tile '}${isLoadTrack?'move-play':''}`}
            onClick={() => setIsLoadTrack(true)}
        >
            <img src={displayList ? track.pictures.medium : track.pictures.large} alt='trackImg' />
            <div className='track-preview flex column w-100'>
                <div className='track-main-details flex column'>
                    <h3>by {track.user.name}</h3>
                    <p>{track.name}</p>
                </div>
                <div className='track-secondary-details flex space-between'>
                    <div className='track-play-count flex'>
                        <img src={headphones} alt='headphones'/>
                        <p>{track.play_count}</p>
                    </div>
                    <div className='track-play-duration flex'>
                        <img src={duration} alt='duration'/>
                        <p>{formatToDuration(track.audio_length)}</p>
                    </div>
                    <div className='track-created flex'>
                        <p>{formatToDate(track.created_time)}</p>
                    </div>
                </div>
            </div>
            {/* <TrackTags/> */}
        </QueryNavLink>

    )
}