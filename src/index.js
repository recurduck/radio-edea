import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'

import './style/style.scss'
import App from './App'
import Search from './cmps/Search'
import TrackDetails from './cmps/TrackDetails'
import SearchHistory from './cmps/SearchHistory'

render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route path="library" element={<Search />}>
            <Route index element={<div className='flex'>
              <TrackDetails />
              <SearchHistory />
            </div>} />
            <Route path=":trackId" element={<div>
              <TrackDetails />
              <SearchHistory />
            </div>} />
          </Route>
        </Route >
        <Route path="/mysongs" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);