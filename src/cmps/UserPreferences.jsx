import { useState } from 'react';
import SearchHistoryList from './SearchHistoryList'
import TrackFavorite from './track/TrackFavorite'

export default function UserPreferences() {
    let [isHistoryShow, setIsHistoryShow] = useState(true);
    
    return (
        <div className='searches-history'>
            <SearchHistoryList isHistoryShow={isHistoryShow} setIsHistoryShow={setIsHistoryShow}/>
            <TrackFavorite isHistoryShow={isHistoryShow} numDisplay={5}/>
        </div>
    )
}