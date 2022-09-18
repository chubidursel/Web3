import React from 'react'
import Header from '../headerNew'
import Sidebar from '../Sidebar'

function Game() {
  return (<>
    <Header />
    <div className='flex justify-center'>
    <Sidebar />
    </div>
    <div>Game</div>
    </>)
}
export default Game