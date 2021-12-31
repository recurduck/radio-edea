import { useEffect, useState } from 'react'
import { userEvents } from '../services/event-bus.service.js'

import LineLoader from './LineLoader.jsx'
import Danger from '../assets/icons/danger.svg'
import Success from '../assets/icons/success.svg'

export default function UserMsg() {
  const [msg, setMsg] = useState(null)

  useEffect(() => {
    let removeEvent = userEvents.on('show-user-msg', (msg) => {
      setMsg({ ...msg })
      setTimeout(() => setMsg(null), 2500)
    })
    return () => {
      removeEvent()
    }
  }, [])

  if (!msg) return <span></span>
  const msgClass = msg.type || ''
  return (
    <div className={'user-msg ' + msgClass}>
      <div className='flex'>
        <img src={msgClass === 'danger' ? Danger : Success} alt='notify' />
        <div className='flex space-around align-center'>
          <span className='mb-2'>{msg.txt}</span>
          <button onClick={() => setMsg(null)}>x</button>
        </div>
      </div>
      <LineLoader />
    </div>
  )
}