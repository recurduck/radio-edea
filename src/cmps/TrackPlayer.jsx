import { useEffect } from "react"
import { useState } from "react/cjs/react.development"
import { searchService } from "../services/search.sercive"

export default function TrackPlayer({ trackId, isPlay, setIsPlay }) {
    const [embed, setEmbed] = useState(null)

    useEffect(async ()=> {
        if(trackId)setEmbed(await onGetEmbeddedPlayer())
    }, [trackId])

    const onGetEmbeddedPlayer = async () => {
        let iFrame = await searchService.getEmbedById(trackId)
        return iFrame.replace('light=1', 'light=0')
        // return iFrame.match(/(?<=src=")[^"]+/)[0].replace('light=1', 'light=0')
    }
    if(!trackId) return <div>need to select a track from the list</div>
    return (
        <div className='track-player' dangerouslySetInnerHTML={{ __html: embed?embed:<div>loading track..</div>}}>
            {/* {embed?<iframe width='100%' height='120' src={embed} frameborder='0'></iframe>:} */}
        </div> 
    )
}