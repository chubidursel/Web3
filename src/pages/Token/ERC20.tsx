import Header from '../../components/headerNew';
import {Info} from "./ERC20_components/info"
import HeaderToken from './ERC20_components/headerToken';
import TokenFunction from './ERC20_components/tokenFunction';
import EventErc20 from './ERC20_components/EventErc20';
import Sidebar from '../../components/Sidebar';

export function ERC20() {

// HOW TO take state from Header component and toss it to EventErc20 ????
  return (
    <>
    <Header />
    <div className='flex justify-center'>
    <Sidebar />
    </div>
    <div className='text-purple-800'>
    <div className="flex justify-center">
    <HeaderToken />
    </div>
    

      <div className="flex justify-center p-3 m-5 space-x-8">
      <Info />
      <TokenFunction />
     
      </div>
      </div>
    <EventErc20 />


</>
  )}
