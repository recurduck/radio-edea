import { Link } from 'react-router-dom'

import logo from '../radio_edea.svg';

export default function Search() {
    return (
        <footer className='container flex justify-center'>
            <Link to='/' className='logo'><img src={logo} className="logo" alt="logo" /></Link>
        </footer>
    )
}