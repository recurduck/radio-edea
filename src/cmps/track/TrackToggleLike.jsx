import { useDispatch, useSelector } from 'react-redux'

import Hearth from '../../assets/icons/hearth.svg'

import { addFavoriteTrack, removeFavoriteTrack } from '../../store/track.actions'

export default function TrackToggleLike({ track }) {
    const { favoriteTracks } = useSelector(state => state.trackModule)
    const dispatch = useDispatch()

    const isFavorite = () => {
        return favoriteTracks.find(favTrack => favTrack.key === track.key)
    }

    const onToggleLike = (ev) => {
        ev.stopPropagation()
        if (isFavorite(track.key)) dispatch(removeFavoriteTrack(track.key))
        else dispatch(addFavoriteTrack(track))
    }

    if (!track) return <></>
    return (
        <img onClick={(ev) => onToggleLike(ev)} className={`track-like ${isFavorite() ? '' : 'unlike'}`}
            src={Hearth} alt='fav' />
    )
}