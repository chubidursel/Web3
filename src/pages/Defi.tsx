import {Link} from "react-router-dom"
import Header from '../components/headerNew'
import AAVE from "../assets/AAVE.png"

export function Defi() {
  return (
    <>
    <Header marginFromTop={'top-1/3'}>
      <h1 className='text-center'>There are few main technoly that are going to help us to switch to the decentralized world 😉 </h1>
    
    </Header>
    <div className='text-white text-7xl font-bold text-center pt-3'>DeFi</div>
    <div className='flex justify-center w-full '>
    <div className='grid grid-cols-2 w-2/3 gap-3 text-5xl text-purple-800 text-center font-bold justify-center mt-5'>

  <Link to="/Defi/exchange" className="bg-blue-100 rounded-2xl border-4 hover:shadow-2xl border-red-400 m-2 p-5 hover:bg-blue-200 hover:animate-pulse">Exchange</Link>

  <Link to="/Defi/vault" className="bg-blue-100 rounded-2xl border-4 hover:shadow-2xl border-red-400 m-2 p-5 hover:bg-blue-200 hover:animate-pulse">Vault</Link>

  <Link to="/Coming_soon" className="bg-blue-100 rounded-2xl border-4 hover:shadow-2xl border-red-400 m-2 p-5 hover:bg-blue-200 hover:animate-pulse">Swap</Link>

  <Link to="/ChainLink" className="bg-blue-100 rounded-2xl border-4 hover:shadow-2xl border-red-400 m-2 p-5 hover:bg-blue-200 hover:animate-pulse">ChainLink</Link>

  <Link to="/DAO" className="bg-blue-100 rounded-2xl border-4 hover:shadow-2xl border-red-400 m-2 p-5 hover:bg-blue-200 hover:animate-pulse">DAO</Link>

  <Link to="/Defi/Market/Auction" className="bg-blue-100 rounded-2xl border-4 hover:shadow-2xl border-red-400 m-2 p-5 hover:bg-blue-200 hover:animate-pulse">Auction</Link>

  <Link to="/Defi/AAVE" className="bg-blue-100 rounded-2xl border-4 hover:shadow-2xl border-red-400 m-2 p-1 hover:bg-blue-200 hover:animate-pulse flex justify-center"><img src={AAVE} alt="coin"  className='h-20'/></Link>

  <Link to="/Defi/Bridge" className="bg-blue-100 rounded-2xl border-4 hover:shadow-2xl border-red-400 m-2 p-5 hover:bg-blue-200 hover:animate-pulse">Bridge</Link>


</div></div>

    </>
  )
}
