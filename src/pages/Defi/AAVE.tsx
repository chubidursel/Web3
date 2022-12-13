import {useState, useEffect, useRef} from 'react'
import Header from '../../components/headerNew';
import { contractAAVE_liq } from '../../components/smart_contract/AAVE_liq';
import conectSigner from '../../components/smart_contract/SIGNER';
import getErrorMessage from '../../components/getErrorMessage';
import { Borrow } from './AAVE_com/Borrow';


export function AAVE() {
  const [amountLocked, setAmountLocked] = useState()
  const [result, setResult] = useState('');
  const [loader, setLoader] = useState(false) // ADD LOADER TO BTN
  const amountRef = useRef<HTMLInputElement>()

  useEffect((()=>{
    (async()=>{
      try {
        const amountTokenLocked = await contractAAVE_liq.getContractAWETHBalance()
        setAmountLocked(amountTokenLocked.toString())
        
        console.log("👨‍💻 Thew whole number of locked ETH: ", amountTokenLocked.toString())
      } catch (error) {
        console.log(error)
      }
    })()
  }),[])

  const handleDeposit = async()=>{
    const num = Number(amountRef.current?.value)
    try {
      setResult(`Pls sign the tx`)
         const contractWithSigner = conectSigner(contractAAVE_liq)

         const overrides = {
          value: num,
      }
      
        const callFunc = await contractWithSigner.stakeEther(overrides)
        const res = await callFunc.wait(1)
        console.log("👨‍💻 DEV >> ", res)

        setResult(`✅ Confirmed! You just locked ${(Number(num) / 1000000000000000000).toString().slice(0, 7)} ETH`)
        setTimeout(() => {setResult('')}, 7000)
      } 

    catch (error) {
      const message = getErrorMessage(error);
      setResult(message)
      setTimeout(() => {setResult('')}, 7000)
    }setLoader(false)
  }

  const handleWithdraw = async()=>{
    const num = Number(amountRef.current?.value)
    try {
      setResult(`Pls sign the tx to withdraw funds`)
         const contractWithSigner = conectSigner(contractAAVE_liq)

       
        const callFunc = await contractWithSigner.withdrawEther(num)
        const res = await callFunc.wait(1)
        console.log("👨‍💻 DEV >> ", res)

        setResult(`✅ Confirmed! You just withdraw ${(Number(num) / 1000000000000000000).toString().slice(0, 7)} ETH`)
        setTimeout(() => {setResult('')}, 7000)
      } 

    catch (error) {
      const message = getErrorMessage(error);
      setResult(message)
      setTimeout(() => {setResult('')}, 7000)
    }setLoader(false)
  }

  return (<>
  <Header marginFromTop={'1/3'}>
    <div className='text-center p-4'>
      <h1 className='font-bold'>There is a simple implemetation of DAO</h1>
      <p>How does it work?</p>
      <p>The NFT-holders can create an proposal and vote for them</p>
      <p>If you want to participate and be a member of our DAO you need to get one of our token which u can get in a few different way (buy it on the Auction, in the shop or buy dirrectly from the smart contract)</p>
      <p>PS: We are going to add more feautures here such as a basic standard of Governant contract with TimeLock</p>
    </div>
  </Header>
      <div>
            <h2 className="flex justify-center text-6xl text-blue-100 font-bold m-3 mb-5">AAVE protocol</h2>
            <h2 className="flex justify-center text-6xl font-bold m-3 mb-5 bg-yellow-200">BETA</h2>
            <div className="flex flex-col justify-center">
         

                <div className='bg-blue-100 w-1/2 flex flex-col m-3 text-purple-800 p-4 rounded-2xl border-4 hover:shadow-2xl border-red-400'>
                    <h1 className='font-bold text-center my-3 text-5xl'><a className='text-center hover:underline' href="https://goerli.etherscan.io/address/0x8Da8B195597bCaC143b9b0D23e5fcaE8fC5293F2#code" target="_blank">Liquidity Pool </a></h1>
                    
                    
                    {/* https://staging.aave.com/   << design from here*/}
                    <div className='flex flex-row'>
                    <h1 className='font-bold  my-3 text-2xl mr-5'>ETH </h1>
                    <h1 className='font-bold  my-3 text-2xl'>{(Number(amountLocked) / 1000000000000000000).toString().slice(0, 6)}</h1>
                        <input ref={amountRef} placeholder='amount ETH in wei' className='hover:shadow-xl ml-4 rounded-lg pl-2 my-2'></input>
                        <button onClick={handleDeposit} className="font-bold py-1 text-2xl hover:shadow-xl mx-10 rounded-xl border-2 border-red-400 px-[15px] hover:bg-red-400 active:bg-red-500 active:text-blue-100">supply</button>
                        <button onClick={handleWithdraw} className="font-bold py-1 text-2xl hover:shadow-xl  mx-10 rounded-xl border-2 border-red-400 px-[15px] hover:bg-red-400 active:bg-red-500 active:text-blue-100">withdraw</button>
                    </div>
                    <div className='flex justify-center'> {result && <h1 className='font-bold mt-3 bg-yellow-100 w-full py-2 text-center  px-1 rounded-xl text-purple-900 text-xl '>{result}</h1>}   </div>
          
                </div>

                <div className='bg-blue-100 w-1/2 flex flex-col m-3 text-purple-800 p-4 rounded-2xl border-4 hover:shadow-2xl border-red-400'>
                    <h1 className='font-bold text-center my-3 text-2xl'>BORROW</h1>
                    <Borrow />
                </div>

                <div className='bg-blue-100 w-1/2 flex flex-col m-3 text-purple-800 p-4 rounded-2xl border-4 hover:shadow-2xl border-red-400'>
                    <h1 className='font-bold text-center my-3 text-2xl'>FlashLoan</h1>
                    <a className='text-center hover:underline' href="https://github.com/chubidursel/smart_contracts/tree/main/AAVE/Flashloan">check out github </a>
                </div>


 
            </div>


      </div>
 
    </>
  )
}
