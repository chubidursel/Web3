import React from 'react'
import Header from '../headerNew'
import Sidebar from '../Sidebar'

function Note() {
  return (
    <>
    <Header />
    <div className='flex justify-center'>
    <Sidebar />
    </div>
    <div>
        <h1>Write your note: </h1>
        <h1>IPFS</h1>
    </div>
    </>
    
  )
}

export default Note