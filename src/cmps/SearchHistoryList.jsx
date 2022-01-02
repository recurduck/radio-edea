import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { loadSearchHistory, loadTracks, removeSearchTrack } from '../store/track.actions'

import Trash from '../assets/icons/trash.svg'
import Arrow from '../assets/icons/arrow.svg'
export default function SearchHistoryList({isHistoryShow, setIsHistoryShow}) {
    let [searchParams, setSearchParams] = useSearchParams({ replace: true });
    const { searchHistory } = useSelector(state => state.trackModule)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadSearchHistory())
    }, [dispatch])

    const onSetNewSearch = (idx) => {
        const search = searchHistory[idx]
        if (searchParams.get('search') === search) {
            showErrorMsg(`You already searching ${search.slice(0, 10) + '..'}`)
        } else {
            showSuccessMsg(`Searching for ${search.slice(0, 10) + '..'}`)
            setSearchParams({ search }, { replace: true });
            dispatch(loadTracks(search))
        }
    }

    const onDeleteSearch = (ev, idx) => {
        ev.stopPropagation()
        dispatch(removeSearchTrack(idx))
    }

    return (<div className={`recent-search ${isHistoryShow ? 'show' : ''}`}>
        <div className='recent-search-title flex space-around'>
            <h2 className='mb-3'>Recent 5 searches</h2>
            <img onClick={() => setIsHistoryShow(!isHistoryShow)} src={Arrow} alt='showSearch' />
        </div>
        {isHistoryShow && searchHistory?.slice(0, 5).map((searchStr, idx) =>
        (<div onClick={() => onSetNewSearch(idx)} className='search-value flex align-center space-between mb-2' key={idx}>
            <p><span>Search for: </span>{searchStr}</p>
            <img src={Trash} alt='Del' onClick={(ev) => onDeleteSearch(ev, idx)} />
        </div>))}
    </div>
    )
}