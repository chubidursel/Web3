import React from 'react';
import Header from '../../components/headerNew';
import { FlipCoin } from './Game/FlipCoin';

export function Game() {
   
// https://freefrontend.com/css-coins/

  return (
    <>
    <Header marginFromTop={'1/3'}>
        <div className='text-center p-1'> 
          <h1 className="font-bold text-3xl">Flip a Coing</h1>
          </div>
       </Header>

    <div className='bg-yellow-300 text-5xl text-center py-4'>
        comming soon ...
    <FlipCoin />

    </div>

    </>
    
  )
}

