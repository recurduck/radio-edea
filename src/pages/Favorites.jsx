import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadFavoriteTracks } from '../store/track.actions'

import UserMsg from '../cmps/UserMsg'
import TrackFavorite from '../cmps/track/TrackFavorite'

export default function Favorites() {
    const { favoriteTracks } = useSelector(state => state.trackModule)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(loadFavoriteTracks())
    },[dispatch])

    if(!favoriteTracks) return <div><h1>There is no Tracks in the favorites try to like some and come back again</h1></div>
    return (
        <div className='favorites-track container flex justify-center'>
            <TrackFavorite displayList={false} favorite={true}/>
            <UserMsg />
        </div>
    )
}
