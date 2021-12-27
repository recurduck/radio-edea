import { useLocation, NavLink, Outlet, useSearchParams } from 'react-router-dom';
import { useState } from 'react'

import { trackService } from '../services/track.service';
function QueryNavLink({ to, ...props }) {
    let location = useLocation();
    return <NavLink to={to + location.search} {...props} />;
}

export default function Search() {
    const [search, setSearch] = useState({ querry: '' })
    const [tracks, setTracks] = useState(null)
    // let [searchParams, setSearchParams] = useSearchParams({ replace: true });

    const handleChange = ev => {
        const { name, value } = ev.target
        setSearch({ ...search, [name]: value })
    }

    const onSearch = async (ev) => {
        ev.preventDefault()
        console.log('search');
        setTracks(await trackService.search(search.querry))
    }

    const onPrevPage = async () => {
        setTracks(await trackService.search(search.querry, tracks.paging.previous))
    }

    const onNextPage = async () => {
        setTracks(await trackService.search(search.querry, tracks.paging.next))
    }
    // const handleChange = ev => {
    //     let filter = ev.target.value;
    //     if (filter) {
    //         setSearchParams({ filter }, { replace: true });
    //     } else {
    //         setSearchParams({}, { replace: true });
    //     }
    // }
    console.log(tracks)
    console.log(tracks?.paging?.previous)
    console.log(tracks?.paging?.next)
    return (
        <div className='search container flex'>
            <nav style={{ borderRight: 'solid 1px', padding: '1rem', color: 'black'}}>
                <form onSubmit={(ev) => onSearch(ev)}>
                    <input name='querry' value={search.querry} onChange={(ev) => handleChange(ev)} />
                    <button type='submit'>Search</button>
                </form>
                {/* <input value={searchParams.get('filter') || ''} onChange={(ev) => handleChange(ev)}/> */}
                {tracks && tracks.data.map((track) => (
                    <QueryNavLink key={track.key} to={`/track/${track.key}}`}
                        style={({ isActive }) => {
                            return {
                                display: 'block',
                                margin: '1rem 0',
                                backgroundColor: isActive ? '$clr1' : '',
                            };
                        }}>{track.name}
                    </QueryNavLink>
                ))}
                <button onClick={onPrevPage} disabled={!tracks?.paging?.previous}>Previous</button>
                <button onClick={onNextPage} disabled={!tracks?.paging?.next}>Next</button>
            </nav>
            <Outlet />
        </div>
    );
}
