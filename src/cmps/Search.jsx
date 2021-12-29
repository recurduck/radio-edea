import { Outlet, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { trackService } from '../services/track.service'
import { searchService } from '../services/search.sercive'

import TrackList from './TrackList'
import Loader from './Loader'

import list from '../assets/icons/list.svg'
import tiles from '../assets/icons/tiles.svg'

export default function Search() {
    const [tracks, setTracks] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isListDisplay, setIsListDisplay] = useState(true)
    let [searchParams, setSearchParams] = useSearchParams({ replace: true });

    // const handleChange = ev => {
    //     const { name, value } = ev.target
    //     setSearch({ ...search, [name]: value })
    // }
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
            setTracks(await searchService.search(searchParams.get('search')))
        }, 1000)
    }

    const onPrevPage = async () => {
        setTracks(await searchService.search(searchParams.get('search'), tracks.paging.previous))
    }

    const onNextPage = async () => {
        setTracks(await searchService.search(searchParams.get('search'), tracks.paging.next))
    }
    return (
        <div className='search container flex'>
            <nav className='flex column' style={{ borderRight: 'solid 1px', padding: '1rem', color: 'black' }}>
                <form className='seach-form flex pb-2' onSubmit={(ev) => onSearch(ev)}>
                    <input name='search' value={searchParams.get('search') || ''} onChange={(ev) => handleChange(ev)} />
                    {loading ? <Loader /> : <button type='submit'>Search</button>}
                </form>

                {tracks && <TrackList tracks={tracks.data} displayList={isListDisplay} />}

                <div className='display-controler flex space-between w-100'>
                    <div className='pagination'>
                        <button onClick={onPrevPage} disabled={!tracks?.paging?.previous}>Previous</button>
                        <button onClick={onNextPage} disabled={!tracks?.paging?.next}>Next</button>
                    </div>
                    <div>
                        <button onClick={() => { setIsListDisplay(false) }}><img src={tiles} /></button>
                        <button onClick={() => { setIsListDisplay(true) }}><img src={list} /></button>
                    </div>
                </div>
            </nav>
            {/* todo redux for the history */}
            <Outlet />
        </div>
    );
}
