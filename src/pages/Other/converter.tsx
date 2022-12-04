import {useState, useRef} from 'react'
import Header from '../../components/headerNew';
import { contractConvertor } from '../../components/smart_contract/convertor_Contract';
import { ethers } from 'ethers';

export function Conveter() {
    const [eth, setEth] = useState<number>(0);
    //selector
    const [resSelecotr, setResSelector] = useState('')
    const funcSelRef = useRef<string>('')
    //kecccek
    const [resKeccak, setResKeccak] = useState('')
    const keccakRef = useRef<HTMLInputElement>() //useRef<HTMLInputElement>('')

     // Bytes > Number 
    const [resBytesNumber, setResBytesNumber] = useState<string | number>()
   const bytesNumRef = useRef<HTMLInputElement>()
   const numberBytesRef = useRef<HTMLInputElement>()
     // Bytes > string 
     const [resStrBytes, setresStrBytes] = useState<string>('')
     const bytesStrRef = useRef<HTMLInputElement>()
     const strBytesRef = useRef<HTMLInputElement>()

          // Bytes > string 
    const [resBigNum, setResBigNum] = useState<string>('')
    const bigNumToNum = useRef<HTMLInputElement | undefined>()
    const numToBigNUm = useRef<HTMLInputElement | undefined>()



    const handleFuncSelector = async() =>{
      try{
      const data = await contractConvertor.funcSelector(funcSelRef.current);
      setResSelector(data)
    } catch (error) {
      console.log(error)
      setResSelector("Opps, error 💀")  
    }
    }

    const handleKeccak = async() =>{
      try{
      const data = await contractConvertor.getHash(keccakRef.current?.value);
      setResKeccak(data)
    } catch (error) {
      console.log(error)
      setResKeccak("💀")  
    }
    }

    const handleBytesNumber = async() =>{
      const bytes = bytesNumRef.current?.value
      const num = numberBytesRef.current?.value
    try{
      if(num && bytes){
        setResBytesNumber("WHYYYYYYY")
      } else if (num) {
        const data = await contractConvertor.numToBytes(num);
        setResBytesNumber(data)
      } 
      else {
        const data = await contractConvertor.bytesToNum(bytes);
        setResBytesNumber(Number(data.toString()))
      }
    } catch (error) {
      console.log(error)
      setResBytesNumber("💀")  
    }
    }

    const handleStringBytes = async() =>{
      const str = strBytesRef.current?.value
      const byt = bytesStrRef.current?.value
      console.log(byt)
      console.log(str)
      if(str){
      const data = await contractConvertor.strToBytes(str);
      setresStrBytes(data)
      }else{
        const data = await contractConvertor.bytesToStr(byt);
        //setresStrBytes(data)
        setresStrBytes("I got mistake in Smart Contract 😢 ")
        console.log(data, "Return UINT intead stirng!!!")
      }
    }


    const handleBigNum = () =>{
      const num = numToBigNUm.current?.value
      const bigNum = bigNumToNum.current?.value

      try {
        if(num){
          const data = "WRITE the func to convert from Ehter.js";
          const objNum = {numm: num}
          setResBigNum(`${objNum}`)
          }else if(bigNum){
            const data = "WRITE the func to convert from Ehter.js";
            setResBigNum(bigNum)
          }else{
            setResBigNum("No data ❌")  
          }
      } catch (error) {
        console.log(error)
        setResBigNum("Opps, error 💀")  
      }


    }
// ADD incode packed

// FUNC TO COPY ON A CLICK
    async function copyTextToClipboard(text:string) {
      if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text);
      } else {
        return document.execCommand('copy', true, text);
      }
    }

  return (
  <>
  <Header marginFromTop={'top-1/3'}>
    <div className='text-center'>
    <h1>Most common data type convertor 🛠️</h1>
    <p>All functionality of how this app convert data you can check on the etherscan just click on Convertor (except eth to wei because solidity does not support float-pointing number 😔)</p>
    </div>

  </Header>
  <div className="flex justify-center" >
  <a href='https://goerli.etherscan.io/address/0x1B493aC3C02735546736b2db2c29A02F49285731' target="_blank" ><h2 className="hover:underline text-5xl text-blue-100 font-bold m-3 mb-10">Convertor</h2></a>
        </div>
      
<div className='flex justify-center flex-wrap'>
  {/*-------------- WEI TO ETH -------------------*/}
  <div className='bg-blue-100 w-max rounded-2xl border-4 border-red-400 hover:bg-blue-200 px-[15px] py-2 m-8'>
    <div className='p-1 flex flex-col w-max' onClick={()=>{setEth(0)}}>
        <h1 className='text-xl font-bold text-center'>ETH 🔄 WEI</h1>
        <label>WEI</label>
        <input onChange={(e: any)=>{setEth(e.target.value / 10 ** 18)}} placeholder='to eth'></input>
        <label>ETH</label>
        <input onChange={(e: any)=>{setEth(e.target.value * 10 ** 18)}} placeholder='to wei' ></input>
        {/* <button className='bg-blue-200 rounded-lg mt-2 hover:bg-blue-300' >convert</button> */}
        {(Number(eth) != 0) && <h1 className='mt-2 text center font-bold hover:underline cursor-pointer' onClick={()=>{copyTextToClipboard(eth.toString())}}>{eth}</h1>}
    </div>
  </div>

    {/*-------------- NUM TO BYTES -------------------*/}
    <div className=' flex flex-col w-max bg-blue-100 rounded-2xl border-4 border-red-400 px-[19px] py-3 m-8 hover:bg-blue-200' onClick={()=>{setResBytesNumber('')}}>
          <h1 className='text-xl font-bold text-center'>Bytes 🔄 Number</h1>
        <label className='text-center'>hexadecimal bytes</label>
        <input ref={bytesNumRef} placeholder='bytes' className='hover:shadow-xl rounded-lg pl-2 my-2'></input>
        <input ref={numberBytesRef} placeholder='number' className='hover:shadow-xl rounded-lg pl-2'></input>
       <button className='bg-blue-200 text-lg font-bold rounded-lg mt-4 hover:bg-blue-300 hover:shadow-xl' onClick={handleBytesNumber} >convert</button>
        {(resBytesNumber) && <h1 className='mt-2 text-center font-bold hover:underline cursor-pointer active:text-xl' onClick={()=>{copyTextToClipboard(resBytesNumber.toString())}}>
          {typeof resBytesNumber != 'number' ? (resBytesNumber.toString().slice(0, 5) +
            "..." +
            resBytesNumber.toString().slice(56)) : resBytesNumber
          }</h1>}
    </div>

 {/*-------------- STR TO BYTES -------------------*/}
    <div className=' flex flex-col w-max bg-blue-100 rounded-2xl border-4 border-red-400 px-[19px] py-3 m-8 hover:bg-blue-200' onClick={()=>{setresStrBytes('')}}>
          <h1 className='text-xl font-bold text-center'>Bytes 🔄 String</h1>
        <label className='text-center'>hexadecimal bytes</label>
        <input ref={bytesStrRef} placeholder='bytes' className='hover:shadow-xl rounded-lg pl-2 my-2'></input>
        <input ref={strBytesRef} placeholder='string' className='hover:shadow-xl rounded-lg pl-2'></input>
       <button className='bg-blue-200 text-lg font-bold rounded-lg mt-4 hover:bg-blue-300 hover:shadow-xl' onClick={handleStringBytes} >convert</button>
        {(resStrBytes) && <h1 className='mt-2 text-center font-bold hover:underline cursor-pointer active:text-xl' onClick={()=>{copyTextToClipboard(resStrBytes)}}>
          {resStrBytes.length >= 40 ? (resStrBytes.toString().slice(0, 5) +
            "..." +
            resStrBytes.toString().slice(185)) : resStrBytes
          }</h1>}
    </div> </div>


    <div className="flex justify-center gap-16" >

        {/*-------------- FUNC SELECTOR -------------------*/}
            <div className=' flex flex-col w-max bg-blue-100 rounded-2xl border-4 border-red-400 px-[19px] py-3 m-8 hover:bg-blue-200' onClick={()=>{setResSelector('')}}>
                <h1 className='text-2xl font-bold text-center underline'>Funcion Selector</h1>
                <label>func name and param type</label>
                <input ref={funcSelRef as any} placeholder='name(unit256, address)' className='hover:shadow-xl rounded-lg pl-2 mt-3'></input>
              <button className='bg-blue-200 rounded-lg mt-4 text-lg font-bold hover:bg-blue-300 hover:shadow-xl' onClick={handleFuncSelector} >convert</button>
                {(resSelecotr) && <h1 className='mt-2 text-center font-bold hover:underline cursor-pointer active:text-xl'  onClick={()=>{copyTextToClipboard(resSelecotr)}}>{resSelecotr}</h1>}
            </div>

        {/*-------------- KECCAK -------------------*/}
            <div className=' flex flex-col w-max bg-blue-100 rounded-2xl border-4 border-red-400 px-[19px] py-3 m-8 hover:bg-blue-200' onClick={()=>{setResKeccak('')}}>
                <h1 className='text-2xl font-bold text-center underline'>SHA-256</h1>
                <label className='text-center'>cryptographic hash</label>
                <input ref={keccakRef} placeholder='any data type' className='hover:shadow-xl rounded-lg pl-2 mt-3'></input>
              <button className='bg-blue-200 text-lg font-bold rounded-lg mt-4 hover:bg-blue-300 hover:shadow-xl' onClick={handleKeccak} >convert</button>
                {(resKeccak) && <h1 className='mt-2 text-center font-bold hover:underline cursor-pointer active:text-xl' onClick={()=>{copyTextToClipboard(resKeccak)}}>{resKeccak.toString().slice(0, 5) +
                    "..." +
                    resKeccak.toString().slice(60)}</h1>}
            </div>

        {/*-------------- Big Number -------------------*/}
              <div className=' flex flex-col w-max bg-blue-100 rounded-2xl border-4 border-red-400 px-[19px] py-3 m-8 hover:bg-blue-200' > 
                <h1 className='text-xl font-bold text-center'>Number 🔄 BigNumber</h1>
                <label className='text-center'>BigNum obj</label>
                <input ref={bigNumToNum} placeholder='BigNum' className='hover:shadow-xl rounded-lg pl-2 my-2'></input>
                <input ref={numToBigNUm} placeholder='Num' className='hover:shadow-xl rounded-lg pl-2'></input>
                <button className='bg-blue-200 text-lg font-bold rounded-lg mt-4 hover:bg-blue-300 hover:shadow-xl' onClick={handleBigNum} >convert</button>
                {(resBigNum) && <h1 className='mt-2 text-center font-bold hover:underline cursor-pointer active:text-xl' onClick={()=>{copyTextToClipboard(resBigNum)}}>{resBigNum}</h1>}
                </div>

    </div>
  </>
    
  )
}
