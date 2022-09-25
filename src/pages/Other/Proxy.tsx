import React, { useEffect, useRef, useState } from 'react'
import Header from '../../components/headerNew';
import "./Proxy.css"
import Modal from '../../components/modal';
import { FunctionBox2 } from './Proxy_components/box2';
import { FunctionBox1 } from './Proxy_components/box1';
import FuncProxy from './Proxy_components/FuncProxy';
import Draggable, {DraggableCore} from 'react-draggable';
//import MetaMask from '../../assets/MetaMask.png'


// https://github.com/diveindev/dragme

export function Proxy() {
  const [showModule, setShowModule] = useState(false);

  
  return (<>
  <main>
      <div  className="container">
      <Header>
        <div className='text-center p-4'>
          <h1 className='font-bold'>There is a simple implemetation of PROXY</h1>
          <p>How does it work?</p>
          </div>
       </Header>



       <Draggable>
        <div className="bg-orange-300 w-max p-5 flex flex-col rounded-2xl">
          <h1 className='font-bold text-4xl text-center'>PROXY</h1>
          <a target='_blanck' href='https://goerli.etherscan.io/address/0x41153577d5931F5c47f575d2EC1674e10AB102aB#code' className='bg-orange-400 font-bold text-center rounded-lg hover:bg-orange-500 hover:underline my-3'>Etherscan</a>
          <button onClick={()=>{setShowModule(true)}} className='bg-red-300 hover:bg-red-400 p-2 rounded-xl'>MODULE TO INTERACT</button>
        </div>
        </Draggable>
        
        <Draggable>
        <div className='bg-purple-200 h-max w-max p-4 text-center rounded-xl mt-3'>
        <h1 className='font-bold text-4xl'>BOX #1</h1>
            <a target='_blanck' href='https://goerli.etherscan.io/address/0x42551E0B5d48ed3A4CEb8592E31e13E24adf19a0#code'>Etherscan</a>
            <FunctionBox1 />
        </div>
        </Draggable>
        <Draggable>
        <div className='bg-purple-200 h-max w-max p-4 text-center rounded-xl mt-3'>
            <h1 className='font-bold text-4xl'>BOX #2</h1>
            <a target='_blanck' href='https://goerli.etherscan.io/address/0x629d6c9473921cCe3317f213c097b16168664646#code' className='hover:underline'>Etherscan</a>
            <FunctionBox2 />
        </div>
        </Draggable>
        {/* <img className='h-40' src={MetaMask}/> */}
      </div>
    </main>
    <Modal 
    active={showModule}
    setActive={setShowModule}
    >
      <FuncProxy />

    </Modal>
    
    </>
  )
}

