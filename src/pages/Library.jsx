import { Outlet, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import TrackList from '../cmps/track/TrackList'
import Loader from '../cmps/Loader'
import UserMsg from '../cmps/UserMsg'

import list from '../assets/icons/list.svg'
import tiles from '../assets/icons/tiles.svg'

import { loadFavoriteTracks, loadTracks, setPage } from '../store/track.actions'
import { searchService } from '../services/search.service'

export default function Library() {
    const [loading, setLoading] = useState(false)
    const [isListDisplay, setIsListDisplay] = useState(true)
    let [searchParams, setSearchParams] = useSearchParams({ replace: true })

    const { tracks, page } = useSelector(state => state.trackModule);
    const dispatch = useDispatch()

    useEffect(() => {
        const isPrefList = searchService.getPreference()
        dispatch(loadFavoriteTracks())
        setIsListDisplay(isPrefList==='list'?true:false)
    },[dispatch])

    useEffect(() => {
        setLoading(false)
    }, [tracks])

    const handleChange = ev => {
        const search = ev.target.value;
        setSearchParams((search) ? { search } : {}, { replace: true });
    }

    const onSearch = (ev) => {
        ev.preventDefault()
        setLoading(true)
        dispatch(setPage(1))
        setTimeout(async () => {
            const trackName = searchParams.get('search')
            dispatch(loadTracks(trackName))
        }, 1000)
    }

    const onPrevPage = () => {
        dispatch(setPage(page-1))
    }
    
    const onNextPage = () => {
        dispatch(setPage(page+1))
    }

    const onChangeDisplay = (display) => {
        searchService.setPreference(display)
        setIsListDisplay(display==='list'?true:false)
    }

    return (
        <div className='search container flex'>
            <nav className='flex column'>
                <form className='search-form flex pb-2' onSubmit={(ev) => onSearch(ev)}>
                    <input name='search'
                        value={searchParams.get('search') || ''}
                        onChange={(ev) => handleChange(ev)}
                        placeholder='Enter song name..' />
                    <button type='submit'>Search</button>
                </form>
                {loading ? <Loader /> : <TrackList tracks={tracks?.data} displayList={isListDisplay} />}



                <div className='display-controler flex space-between w-100'>
                    <div className='pagination'>
                        <button onClick={onPrevPage} disabled={page===1}>Previous</button>
                        <span>{page}</span>
                        <button onClick={onNextPage} disabled={!tracks || tracks.data.length <= page*6}>Next</button>
                    </div>
                    <div>
                        <button onClick={() => { onChangeDisplay('tiles') }}>
                            <img className={isListDisplay ? '' : 'active'} src={tiles} alt='tiles' />
                        </button>
                        <button onClick={() => { onChangeDisplay('list') }}>
                            <img className={isListDisplay ? 'active' : ''} src={list} alt='list' />
                        </button>
                    </div>
                </div>
            </nav>
            <UserMsg />
            <Outlet />
        </div>
    );
}
