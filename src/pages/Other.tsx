import React from 'react'
import Header from '../components/header'
import Sidebar from '../components/Sidebar'
import Welcome from '../components/Other/welcome'

export function Other() {
  return (<>
  
  <div className='flex flex-row'>
    <Sidebar />
    <Welcome />
  </div>
  </>
  )
}

//<Header />