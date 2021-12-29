import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { searchService } from '../services/search.sercive'

import playIcon from '../assets/icons/play.svg'
import pauseIcon from '../assets/icons/pause.svg'

export default function TrackDetails() {
    let params = useParams();
    const trackId = params.trackId?.replaceAll('~', '/')
    const [isPlay, setIsPlay] = useState(false)
    const [track, setTrack] = useState(null)
    const [widget, setWidget] = useState(null)

    useEffect(() => {
        const myWidget = window.Mixcloud.PlayerWidget(document.getElementById('mywidget'));
        setWidget(myWidget)
    }, [track])

    useEffect(() => {
        console.log(track)
        if (track) {
            widget.ready.then(function () {
                widget.load(track.key, true)
                widget.play()
                widget.getIsPaused().then(res => setIsPlay(!res))
                // widget.events.pause.on(()=>setIsPlay(false));
                widget.events.pause.on((res)=> console.log(res));
                widget.events.play.on((res)=> console.log(res));
                // widget.events.play.on(res) => setIsPlay(true));
            });
        }
    }, [track])

    useEffect(() => {
        if (params.trackId) {
            const fetchAPI = async () => {
                console.log('loading from param')
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


    const onToggleTrack = () => {
        if (track) {
            widget.togglePlay()
            widget.getIsPaused().then(res => setIsPlay(!res))
        }
        else console.log('event bus please select track to play')
    }

    return (
        <div className="track-details flex column align-center w-100">
            <div className={`disk-player mb-2 ${isPlay ? 'spin' : ''}`} onClick={() => onToggleTrack()}>
                <img className='track-disk' src={track?.pictures.large} alt="Disc" />
                <img className={`track-button ${isPlay ? 'transparent' : ''}`} src={isPlay ? pauseIcon : playIcon} />
            </div>
            <div className='track-player'>
                <div className='demo-player'><span>Please select a track and enjoy</span></div>
                <iframe className={`widget-player ${track ? '' : 'hide'}`} title='widget' id='mywidget' width='100%' height='120' src={'https://www.mixcloud.com/widget/iframe/?feed=https%3A%2F%2Fwww.mixcloud.com%2Fspartacus%2Fparty-time%2F&amp;hide_cover=0" frameborder="0"'}></iframe>
            </div>
        </div>)
}