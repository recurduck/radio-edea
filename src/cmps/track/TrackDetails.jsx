import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { searchService } from '../../services/search.service'
import { showErrorMsg } from '../../services/event-bus.service.js'
import TrackToggleLike from './TrackToggleLike'

import PlayIcon from '../../assets/icons/play.svg'
import pauseIcon from '../../assets/icons/pause.svg'
import { useSelector } from 'react-redux'

export default function TrackDetails() {
    const { tracks, page } = useSelector(state => state.trackModule)
    let params = useParams();
    const trackId = params.trackId?.replaceAll('~', '/')
    const [isPlay, setIsPlay] = useState(false)
    const [track, setTrack] = useState(null)
    const [widget, setWidget] = useState(null)
    const mywidget = useRef()

    useEffect(() => {
        let currTrack = tracks?.data.slice((page - 1) * 6, page * 6).find(listTrack => listTrack.key === trackId)
        if (currTrack) {
            setTrack(currTrack)
        } else {
            const fetchAPI = async () => {
                currTrack = await searchService.getById(trackId)
                setTrack(currTrack)
            }
            try {
                fetchAPI()
            } catch (err) {
                showErrorMsg('Got error while getting the track')
            }
        }
    }, [trackId])

    useEffect(() => {
        mywidget?.current && intializeWidget(mywidget.current);
    }, [mywidget.current])

    useEffect(() => {
        if (widget && track) {
            loadTrack(track);
        }
    }, [track, widget])

    const intializeWidget = (widgetElement) => {
        if (widgetElement) {
            const myWidget = window.Mixcloud.PlayerWidget(widgetElement);
            myWidget.ready.then(() => {
                setWidget(myWidget);
                widget.events.pause.on(() => {
                    setIsPlay(false)
                });
                widget.events.play.on(() => {
                    setIsPlay(true);
                })
                widget.events.ended.on(() => loadTrack())

            });
        }
    }

    const onToggleTrack = () => {
        if (widget) {
            widget.togglePlay()
            widget.getIsPaused().then(isPaused => setIsPlay(!isPaused))
        }
        else showErrorMsg('Please select track to play')
    }

    const loadTrack = (song = track) => {
        widget.getCurrentKey().then(key => {
            if (song.key === key) {
                widget.seek()
            } else {
                widget.load(song.key, true).then(() => {
                    widget.play()
                    widget.getIsPaused().then(res => setIsPlay(!res))
                })
            }
        })
    }

    return (
        <div className='track-details flex column align-center'>
            <h1 className='track-title animated-color w-100'>{track ? track.name : 'No Track'}</h1>
            <div className={`disk-player mb-2 ${isPlay ? 'spin' : ''}`}>
                <img className='track-disk' src={track ? track.pictures.large : PlayIcon} alt='disc' />
                <img onClick={() => onToggleTrack()} className={`track-button ${isPlay ? 'transparent' : ''}`} src={isPlay ? pauseIcon : PlayIcon} alt='toggleplay' />
            </div>
            <div className='track-player'>
                <TrackToggleLike track={track} />
                <div className='demo-player' onClick={(ev) => ev.stopPropagation()}><span>Please select a track and enjoy</span></div>
                <iframe ref={mywidget} className={`widget-player ${track ? '' : 'hide'}`} title='widget' width='100%' height='120' frameBorder='0'
                    src={'https://www.mixcloud.com/widget/iframe/?feed=https%3A%2F%2Fwww.mixcloud.com%2Fspartacus%2Fparty-time%2F&hide_cover=1&light=0'}></iframe>
            </div>
        </div>
    )
}