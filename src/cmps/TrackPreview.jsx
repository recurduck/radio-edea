import headphones from '../assets/icons/headphones.svg'
import QueryNavLink from './QueryNavLink'
export default function TrackPreview({ track, displayList }) {

    const formatToDuration = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toGMTString().match(/([\d]+:){2}[\d]+/)[0]
    }
    const formatToDate = (timestamp) => {

    }
    
    return (
        <QueryNavLink to={`/library/${track.key.replaceAll('/','~')}`}
            className={`track-card flex ${displayList ? 'list' : 'tile'}`}
            style={({ isActive }) => {
                return {
                    display: 'block',
                    margin: '1rem 0',
                    backgroundColor: isActive ? '$clr1' : '',
                };
            }}>
            <img src={displayList ? track.pictures.medium : track.pictures.large} />
            <div className='flex column'>
                <div className='flex column'>
                    <h3>by {track.user.name}</h3>
                    <p>{track.name}</p>
                </div>
                <div className='flex'>
                    <p className="track-play-count"><img src={headphones} />{track.play_count}</p>
                    <p>Duration: {formatToDuration(track.audio_length)}</p>
                    <p>{track.created_time}</p>
                </div>
            </div>
            {/* <TrackTags/> */}
        </QueryNavLink>

    )
}