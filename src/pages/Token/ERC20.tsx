import Header from '../../components/headerNew';
import {Info} from "./ERC20_components/info"
import HeaderToken from './ERC20_components/headerToken';
import TokenFunction from './ERC20_components/tokenFunction';

export function ERC20() {


  return (
    <>
    <Header />
    <div className='text-purple-800'>
    <div className="flex justify-center">
    <HeaderToken />
    </div>
    

      <div className="flex justify-center p-3 m-5 space-x-8">
      <Info />
      <TokenFunction />
     
      </div>
      </div>


</>
  )}
