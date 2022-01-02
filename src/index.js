import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import './style/style.scss'
import {store} from './store/store.js'

import App from './App'
import Library from './pages/Library'
import TrackDetails from './cmps/track/TrackDetails'
import UserPreferences from './cmps/UserPreferences'
import Home from './pages/Home'
import Favorites from './pages/Favorites'

render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<App />} >
            <Route index element={<Home />} />
            <Route path='library' element={<Library />}>
              <Route index element={<main className=''>
                <TrackDetails />
                <UserPreferences />
              </main>} />
              <Route path=':trackId' element={<main className=''>
                <TrackDetails />
                <UserPreferences />
              </main>} />
            </Route>
            <Route path='favorites' element={<Favorites />}/>
          </Route >
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);