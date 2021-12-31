import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import './style/style.scss'
import {store} from './store/store.js'

import App from './App'
import Search from './cmps/Search'
import TrackDetails from './cmps/TrackDetails'
import UserPreferences from './cmps/UserPreferences'
import Hero from './cmps/Hero'

render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<App />} >
            <Route index element={<Hero />} />
            <Route path='library' element={<Search />}>
              <Route index element={<main className=''>
                <TrackDetails />
                <UserPreferences />
              </main>} />
              <Route path=':trackId' element={<main className=''>
                <TrackDetails />
                <UserPreferences />
              </main>} />
            </Route>
          </Route >
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);