import { useEffect, useState } from 'react'
import Header from '../../components/headerNew';
import "./Proxy.css"
import Draggable, {DraggableCore} from 'react-draggable';


export function Terminal() {
  const [showModule, setShowModule] = useState(false);

  
  return (<>
  <main>
    
      <div  className="container">
      <div className="cels">
      <Header marginFromTop={'1/3'}>
        <div className='text-center p-4'>
          <h1 className='font-bold'>There is a simple implemetation of PROXY contract</h1>
          <p>How does it work?🤔</p>
          <p>The orange box is our Proxy contract which is in theory other user are going to interact with. Under the hood this contract doesnt have any function that change it local state. But this proxy contract can use low-level function to call setter from another contract (Box#1 or Box#2) and change only its own value</p>
          </div>
       </Header>

       <Draggable>
       <div className="w-1/2 mx-auto">
            <div className="w-full shadow-2xl subpixel-antialiased rounded h-64 bg-black border-black mx-auto">
                <div className="flex items-center h-6 rounded-t bg-gray-100 border-b border-gray-500 text-center text-black" id="headerTerminal">
                <div className="flex ml-2 items-center text-center border-red-900 bg-red-500 shadow-inner rounded-full w-3 h-3" id="closebtn">
                </div>
                <div className="ml-2 border-yellow-900 bg-yellow-500 shadow-inner rounded-full w-3 h-3" id="minbtn">
                </div>
                <div className="ml-2 border-green-900 bg-green-500 shadow-inner rounded-full w-3 h-3" id="maxbtn">
                </div>
                <div className="mx-auto pr-16" id="terminaltitle">
                    <p className="text-center text-sm">Terminal</p>
                </div>

                </div>
                <div className="pl-1 pt-1 h-auto  text-green-200 font-mono text-xs bg-black" id="console">
                <p className="pb-1">Last login: Wed Sep 25 09:11:04 on ttys002</p>
                <p className="pb-1">Address: 0x123$</p>
                <input type="text" className='' placeholder=''/>
                </div>
            </div> 
        </div>
        </Draggable>



      </div>
      </div>
    </main>
  
    
    </>
  )
}

