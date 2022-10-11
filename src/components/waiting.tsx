import React from 'react'
import wait from "../assets/wait.gif"
import Header from './headerNew'


export function Wait() {
  return (<>
  <Header marginFromTop={'top-1/3'}>Stay tune</Header>

    <div className='grid h-screen place-items-center'>
        <div>
        <img src={wait} alt="wait" className='h-60'/>
        <h1 className='text-white text-5xl font-bold'>coming soon...</h1>
        </div>

    </div></>
  )
}

