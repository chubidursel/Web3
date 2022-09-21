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
    <Header>info about token ERC20</Header>
 
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
