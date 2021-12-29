import { Link } from "react-router-dom";

export default function Hero() {
    return (<div className='home'>
        <Link className='app-hero' to='/library'>
            <h1><span>RADIO</span><span>EDEA</span></h1>
        </Link>
    </div>)
}