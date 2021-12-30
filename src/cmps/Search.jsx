import { Outlet, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { searchService } from '../services/search.service'

import TrackList from './TrackList'
import Loader from './Loader'
import UserMsg from './UserMsg'

import list from '../assets/icons/list.svg'
import tiles from '../assets/icons/tiles.svg'

import { loadTracks } from '../store/track.actions'

export default function Search() {
    // const [tracks, setTracks] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isListDisplay, setIsListDisplay] = useState(true)
    let [searchParams, setSearchParams] = useSearchParams({ replace: true })

    const { tracks } = useSelector(state => state.trackModule)
    const { currSearch } = useSelector(state => state.trackModule)
    const dispatch = useDispatch()

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
        setTimeout(async () => {
            const trackName = searchParams.get('search')
            dispatch(loadTracks(trackName))
        }, 1000)
    }

    const onPrevPage = async () => {

        // setTracks(await searchService.search(searchParams.get('search'), tracks.paging.previous))
    }

    const onNextPage = async () => {
        // setTracks(await searchService.search(searchParams.get('search'), tracks.paging.next))
    }
    return (
        <div className='search container flex'>
            <nav className='flex column' style={{ borderRight: 'solid 1px', padding: '1rem', color: 'black' }}>
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
                        <button onClick={onPrevPage} disabled={!tracks?.paging?.previous}>Previous</button>
                        <button onClick={onNextPage} disabled={!tracks?.paging?.next}>Next</button>
                    </div>
                    <div>
                        <button onClick={() => { setIsListDisplay(false) }}>
                            <img className={isListDisplay ? '' : 'active'} src={tiles} alt='tiles' />
                        </button>
                        <button onClick={() => { setIsListDisplay(true) }}>
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
