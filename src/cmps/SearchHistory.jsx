import { useEffect, useState } from "react"
import { useSearchParams } from 'react-router-dom'
import { searchService } from "../services/search.sercive"

export default function SearchHistory() {
    let [searchParams, setSearchParams] = useSearchParams({ replace: true });
    const [searchHistory, setSearchHistory] = useState(null)

    useEffect(() => {
        searchService.query().then(res => setSearchHistory(res))
    }, [])

    const onSetNewSearch = (idx) => {
        const search = searchHistory[idx]
        setSearchParams({ search }, { replace: true });
    }

    const onDeleteSearch = (idx) => {
        let searches = [...searchHistory]
        searches.splice(idx, 1)
        searchService.remove(idx)
        setSearchHistory(searchHistory)
    }
    return (
        <div className="search-history">
            {searchHistory?.slice(0, 5).map((searchStr, idx) =>
            (<div key={idx}>
                <span onClick={() => onSetNewSearch(idx)}>{searchStr}</span>
                <button onClick={() => onDeleteSearch(idx)}>X</button>
            </div>))}
        </div>
    )
}