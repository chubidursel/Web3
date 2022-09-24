import React, { useEffect, useRef, useState } from 'react'
import Header from '../../components/headerNew';
import "./Proxy.css"
import Modal from '../../components/modal';
import { FunctionBox } from './Proxy_components/functions';
import FuncProxy from './Proxy_components/FuncProxy';
import MetaMask from '../../assets/MetaMask.png'


// https://github.com/diveindev/dragme

export function Proxy() {
  const [showModule, setShowModule] = useState(false);

  const constainerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const isClicked = useRef<boolean>(false);

  const coords = useRef<{
    startX: number,
    startY: number,
    lastX: number,
    lastY: number
  }>({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0
  })

  useEffect(() => {
    if (!boxRef.current || !constainerRef.current) return;

    const box = boxRef.current;
    const container = constainerRef.current;


    const onMouseDown = (e: MouseEvent) => {
      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
    }

    const onMouseUp = (e: MouseEvent) => {
      isClicked.current = false;
      coords.current.lastX = box.offsetLeft;
      coords.current.lastY = box.offsetTop;
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) return;

      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      box.style.top = `${nextY}px`;
      box.style.left = `${nextX}px`;
    }

    box.addEventListener('mousedown', onMouseDown);
    box.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseUp);

    const cleanup = () => {
      box.removeEventListener('mousedown', onMouseDown);
      box.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseUp);
    }

    return cleanup;
  }, [])

  return (<>
  <main>
      <div ref={constainerRef} className="container">
      <Header>
    <div className='text-center p-4'>
      <h1 className='font-bold'>There is a simple implemetation of PROXY</h1>
      <p>How does it work?</p>
 
    </div>
  </Header>
        <div ref={boxRef} className="box">
          <h1 className='font-bold'>PROXY</h1>
          <a target='_blanck' href='https://goerli.etherscan.io/address/0x42551E0B5d48ed3A4CEb8592E31e13E24adf19a0#code' className='bg-green-300'>Etherscan</a>
          <button onClick={()=>{setShowModule(true)}} className='bg-purple-200 p-2 rounded-xl'>MODULE TO INTERACT</button>
        </div>

        <div className='bg-green-300 h-40 w-40 m-10'>
            <h1>BOX #2</h1>
            <a target='_blanck' href='https://goerli.etherscan.io/address/0x42551E0B5d48ed3A4CEb8592E31e13E24adf19a0#code'>Etherscan</a>
            <h1>local number: {21}</h1>
        </div>

        <div className='bg-green-400 h-40 w-40 m-10'>
            <h1>BOX #1</h1>
            <a href='https://goerli.etherscan.io/address/0x629d6c9473921cCe3317f213c097b16168664646#code'>Etherscan</a>
            <FunctionBox />
        </div>
        <img className='h-40' src={MetaMask}/>
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

