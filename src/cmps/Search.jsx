import { Outlet, useSearchParams } from 'react-router-dom'
import { useState } from 'react'

import { trackService } from '../services/track.service'
import { searchService } from '../services/search.sercive'

import TrackList from './TrackList'

export default function Search() {
    const [tracks, setTracks] = useState(null)
    const [isListDisplay, setIsListDisplay] = useState(true)
    let [searchParams, setSearchParams] = useSearchParams({ replace: true });

    // const handleChange = ev => {
    //     const { name, value } = ev.target
    //     setSearch({ ...search, [name]: value })
    // }
    const handleChange = ev => {
        const search = ev.target.value;
        setSearchParams((search) ? { search } : {}, { replace: true });
    }

    const onSearch = async (ev) => {
        ev.preventDefault()
        setTracks(await searchService.search(searchParams.get('search')))
    }

    const onPrevPage = async () => {
        setTracks(await searchService.search(searchParams.get('search'), tracks.paging.previous))
    }

    const onNextPage = async () => {
        setTracks(await searchService.search(searchParams.get('search'), tracks.paging.next))
    }

    return (
        <div className='search container flex'>
            <nav style={{ borderRight: 'solid 1px', padding: '1rem', color: 'black' }}>
                <form onSubmit={(ev) => onSearch(ev)}>
                    <input name='search' value={searchParams.get('search') || ''} onChange={(ev) => handleChange(ev)} />
                    <button type='submit'>Search</button>
                </form>
                {tracks && <TrackList tracks={tracks.data} displayList={isListDisplay} />}
                <button onClick={onPrevPage} disabled={!tracks?.paging?.previous}>Previous</button>
                <button onClick={onNextPage} disabled={!tracks?.paging?.next}>Next</button>
                <button onClick={() => { setIsListDisplay(true) }}>三</button>
                <button onClick={() => { setIsListDisplay(false) }}>口</button>
            </nav>
            {/* todo redux for the history */}
            <Outlet />
        </div>
    );
}
