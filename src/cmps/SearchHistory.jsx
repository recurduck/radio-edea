import { useEffect, useState } from "react"
import { searchService } from "../services/search.sercive"

export default function SearchHistory() {
    const [searchHistory, setSearchHistory] = useState(null)

    useEffect(() => {
        searchService.query().then(res => setSearchHistory(res))
    }, [])

    const onDeleteSearch = (idx) => {
        let searches = [...searchHistory]
        searches.splice(idx, 1)
        searchService.remove(idx)
        setSearchHistory(searchHistory)
    }
    return (
        <div className="search-history">
            {searchHistory?.slice(0, 5).map((searchStr, idx) =>
            (<div key={idx}>{searchStr}<button onClick={() => onDeleteSearch(idx)}>X</button></div>))}
        </div>
    )
}