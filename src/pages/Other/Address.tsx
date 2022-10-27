import React from 'react';
import Header from '../../components/headerNew';
import copyTextToClipboard from '../../utils/copyPast';
import QrCode from "../../utils/qrCode";
import Modal from '../../components/modal';
import Shcheme from '../../assets/pi.jpeg'
import Tx from './Address_comp/tx'



import {newWallet} from './Address_comp/ethersJsWallet.js';

export function Address() {
    const [result, setResult] = React.useState<any>();
    const [active, setActive] = React.useState(false);
    const [publicQr, setPublicQr] = React.useState('');


    const onCreateAddr = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
   
            const wallet = newWallet()
            const privateKey = wallet.privateKey;
            const publicKey = wallet.publicKey;
            const ethAddress = wallet.address
            const mnemonic = wallet.mnemonic
       
            setResult(
            <div className='flex flex-col items-center font-bold mt-3 bg-yellow-100 w-full py-2 text-center  px-1 rounded-xl text-purple-900 text-xl relative'>

                <h1 >Private key: <span className='hover:underline hover:cursor-copy text-lg' onClick={()=>{copyTextToClipboard(privateKey)}}>{privateKey.toString().slice(0, 15) + "..." + privateKey.toString().slice(60)}</span></h1>
                <h1>Public key: <span className='hover:underline hover:cursor-copy text-lg' onClick={()=>{copyTextToClipboard(publicKey)}}>{publicKey.toString().slice(0, 15) + "..." + publicKey.toString().slice(110)}</span></h1>
                <h1>Address: <span className='hover:underline hover:cursor-copy text-lg' onClick={()=>{copyTextToClipboard(ethAddress)}}>{ethAddress}</span></h1>
                <h1>Mnemonic: <span className='hover:underline hover:cursor-copy text-lg' onClick={()=>{copyTextToClipboard(mnemonic)}}>{mnemonic}</span></h1>
                
                <div className='absolute top-3 right-3 hover:cursor-pointer' onClick={()=>setResult('')}>❌</div>  
                <div className="mt-3 w-max font-bold py-1 text-2xl hover:shadow-xl hover:cursor-pointer rounded-xl border-2 border-red-400 px-[15px] hover:bg-red-400 active:bg-red-500 active:text-blue-100" onClick={()=>{setPublicQr(mnemonic); setActive(true)}}>QR-CODE</div>

            </div>
            )
            
        } catch (error) {
            setResult(<p className='font-bold mt-3 bg-yellow-100 w-full py-2 text-center  px-1 rounded-xl text-purple-900 text-xl'>Opsss, something went wrong 😬</p>)
            setTimeout(() => {setResult(null)}, 5000)
        }

    }



  return (
    <>
    <Header marginFromTop={'1/3'}>
        <div className='text-center p-1'> 
          <h1 className="font-bold text-3xl">Create Ethreum Address</h1>
          <p>ETH addr are derived in 3 steps</p>
          <p>In this block you can get them all just in one click</p>
          
          <p className='mt-3 text-gray-400 italic'>Check out our scheme:</p>
          <img src={Shcheme} alt="sheme of address" />

          <p className='font-bold mt-3'>💡 Usefull links: </p>
          <div className='flex flex-col'>
            <a target="_blank" href="https://www.openssl.org/docs/man3.0/man3/RAND_bytes.html" className='hover:underline'>1. Rand_Bytes OpenSSL</a>
            <a href="https://www.bitaddress.org/" target="_blank" className='hover:underline'>2. BitAddress</a>
            <a href="https://www.royalfork.org/2017/12/10/eth-graphical-address/?ref=hackernoon.com" target="_blank" className='hover:underline'>3. Graphical Ethereum Address</a>
            <a href="https://eips.ethereum.org/EIPS/eip-55" target="_blank" className='hover:underline'>4. EIP-55</a>

            <p className='text-gray-400 italic mt-3'>PS: Based on <a href="https://docs.ethers.io/v5/api/signer/#Wallet-constructor" target="_blank" className='hover:underline font-bold'>Ethers.Js</a> libraby</p>
          </div>
          
          </div>
       </Header>


       <div className="flex justify-center">
      <div className="bg-blue-100 mt-20 px-5 py-2 text-lg rounded-lg w-1/2 border-4 text-purple-800 border-red-400">
      <p className="py-2 font-bold text-3xl text-center">Create New Ethereum Account</p>
      <div className="text-start ml-10 mb-3">
                <h2>🔑 Private key is securely generated (SHA256)</h2>  
                <h2>🔑 Publick key is derived from Private via Elliptic curve</h2>
                <h2>📮 Address is derived from Publick key via  (SHA-256 & last 20 bytes)</h2> 
              </div>
          <form onSubmit={onCreateAddr} className="h=30 flex justify-center">
            {/* <input value={randInput} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>(setRandInput(event.target?.value))} type="text" placeholder="write anyhing to generete keys" className='w-1/2 hover:shadow-xl h-30 mr-3 rounded-lg text-center'/> */}
            <button className="font-bold py-1 text-2xl hover:shadow-xl w-full mx-10 rounded-xl border-2 border-red-400 px-[15px] hover:bg-red-400 active:bg-red-500 active:text-blue-100" type="submit">create</button>
          </form>
          <div className='flex justify-center mb-3'> {result && result}</div>
      </div>
      </div>

      <Modal
   active={active}
   setActive={setActive}
   marginFromTop={'top-16'}
   >
   <QrCode address={publicQr}/>
   
   </Modal>

   <Tx />

    </>
    
  )
}

