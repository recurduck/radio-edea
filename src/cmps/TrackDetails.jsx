import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { searchService } from '../services/search.sercive'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import playIcon from '../assets/icons/play.svg'
import pauseIcon from '../assets/icons/pause.svg'

export default function TrackDetails() {
    let params = useParams();
    const trackId = params.trackId?.replaceAll('~', '/')
    const [isPlay, setIsPlay] = useState(false)
    const [track, setTrack] = useState(null)
    const [widget, setWidget] = useState(null)
    const mywidget = useRef()
    useEffect(() => {
        if (params.trackId) {
            const fetchAPI = async () => {
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

    useEffect(() => {
        const myWidget = window.Mixcloud.PlayerWidget(mywidget.current);
        setWidget(myWidget)
    }, [])

    useEffect(() => {
        if (track) {
            widget.ready.then(() => {
                widget.load(track.key, true).then(() => {
                    widget.play()
                    widget.getIsPaused().then(res => setIsPlay(!res))
                    widget.events.pause.on(() => { setIsPlay(false) })
                    widget.events.play.on(() => setIsPlay(true))
                    widget.events.play.on(() => setIsPlay(true))
                    widget.events.ended.on(() => loadTrack())
                })
            });
        }
    }, [track])

    const onToggleTrack = () => {
        if (track) {
            widget.togglePlay()
            widget.getIsPaused().then(res => setIsPlay(!res))
        }
        else showErrorMsg('Please select track to play')
    }

    // const loadTrack = (song = track) => {
    const loadTrack = (song = track) => {
        widget.getCurrentKey().then(key => {
            if (song.key === key) {
                widget.seek()
            } else {
                widget.ready.then(() => {
                    widget.load(song.key, true).then(() => {
                        widget.play()
                        widget.getIsPaused().then(res => setIsPlay(!res))
                    })
                });
            }
        })
    }

    return (
        <div className='track-details flex column align-center w-100'>
            <div className={`disk-player mb-2 ${isPlay ? 'spin' : ''}`} onClick={() => onToggleTrack()}>
                <img className='track-disk' src={track?.pictures.large} alt='disc' />
                <img className={`track-button ${isPlay ? 'transparent' : ''}`} src={isPlay ? pauseIcon : playIcon} alt='toggleplay' />
            </div>
            <div className='track-player'>
                <div className='demo-player'><span>Please select a track and enjoy</span></div>
                <iframe ref={mywidget} className={`widget-player ${track ? '' : 'hide'}`} title='widget' width='100%' height='120' frameBorder='0'
                    src={'https://www.mixcloud.com/widget/iframe/?feed=https%3A%2F%2Fwww.mixcloud.com%2Fspartacus%2Fparty-time%2F&hide_cover=1&light=0'}></iframe>
            </div>
        </div>)
}