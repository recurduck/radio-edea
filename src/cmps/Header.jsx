import { Link, NavLink } from 'react-router-dom'

import logo from '../radio_edea.svg';

export default function Header() {
    return (
        <header className='container flex'>
            <Link to='/' className='logo'><img src={logo} className="logo" alt="logo" /></Link>

            <div className="dropdown flex">
                <input type="checkbox" id="checkbox_toggle" />

                <label htmlFor="checkbox_toggle" className="hamburger">
                    <div className="line line-1"></div>
                    <div className="line line-2"></div>
                    <div className="line line-3"></div>
                </label>

                <nav>
                    <ul className='flex'>
                        <li><NavLink to='/home'>Home</NavLink></li>
                        <li><NavLink to='/library'>Library</NavLink></li>
                        <li><NavLink to='/mysongs'>MySongs</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}