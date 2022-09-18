import React from 'react'
import wait from "../assets/wait.gif"
import Header from './headerNew'
import Sidebar from './Sidebar'

export function Wait() {
  return (<>
  <Header />
    <div className='flex justify-center'>
    <Sidebar />
    </div>
    <div className='grid h-screen place-items-center'>
        <div>
        <img src={wait} alt="wait" className='h-60'/>
        <h1 className='text-white text-5xl font-bold'>coming soon...</h1>
        </div>

    </div></>
  )
}

