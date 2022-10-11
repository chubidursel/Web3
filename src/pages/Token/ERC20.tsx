import Header from '../../components/headerNew';
import {Info} from "./ERC20_components/info"
import HeaderToken from './ERC20_components/headerToken';
import TokenFunction from './ERC20_components/tokenFunction';
import EventErc20 from './ERC20_components/EventErc20';
import {useState} from 'react';

export function ERC20() {
  const [showEvent, setShowEvent] = useState(false)
  const handleToggle = () =>setShowEvent(!showEvent)

  return (
    <>
    <Header marginFromTop={21}>
      <div className='text-center'>
        <h1 className='text-4xl underline'>ERC20 token</h1>
        <p>In this section you can see our simple ERC20 token wich you can use in other section like Exchange or Vault. At this moment we have deployed this smart contract only in Goerli testnet, but soon we will do the same to other network like BNB or Poligon</p>
      </div>
    </Header>
 
    <div className='text-purple-800'>
    <div className="flex justify-center">
    <HeaderToken handleToggle={handleToggle} />
    </div>
    

      <div className="flex justify-center p-3 m-5 space-x-8">
      <Info />
      <TokenFunction />
      </div>
      </div>
      <div className="flex justify-center p-3 m-5 space-x-8">
      {showEvent ? <EventErc20 /> : null} 
      </div>
   

</>
  )}
