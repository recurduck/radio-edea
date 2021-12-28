import { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom';
import { searchService } from "../services/search.sercive";

import TrackPlayer from './TrackPlayer'
export default function TrackDetails() {
    let navigate = useNavigate();
    let params = useParams();
    const trackId = params.trackId?.replaceAll('~', '/')
    const [isPlay, setIsPlay] = useState(false)
    const [track, setTrack] = useState(null)

    useEffect(() => {
        if (params.trackId) {
            const fetchAPI = async () => {
                console.log('loading')
                setTrack(await searchService.getById(trackId))
            }
            try {
                fetchAPI()
            } catch (err) {
                //eventbus
            }
        } else {
            //redux need to be reversed
        }
    }, [params.trackId])
    console.log()
    return (
        <div className="track-details flex column align-center">
            <div className={`disk-player ${isPlay ? 'spin' : ''}`}>
                <img className='track-disk' src={track?.pictures.large} alt="Disc" />
            </div>
            <TrackPlayer trackId={trackId} isPlay={isPlay} setIsPlay={setIsPlay} />
        </div>)
}