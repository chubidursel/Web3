import React, {useState} from 'react'

export function Conveter() {
    const [ethTOwei, setEthToWei] = useState();
    const [weiTOeth, setWeiToEth] = useState();

  return (
  <>
  <div>
    <h1>Conveter</h1>
    <div className='bg-blue-100 p-10 flex flex-col w-2/5'>
        <h1>ETH ➡️ WEI</h1>
        <label>WEI</label>
        <input onChange={(e)=>{setWeiToEth(e.target.value as any)}} placeholder={ethTOwei ? (Number(ethTOwei) * 1000000000000000000).toString() : 'Wei'}></input>
        <label>ETH</label>
        <input onChange={(e)=>{setEthToWei(e.target.value as any)}} ></input>
        
    </div>
  </div>
  </>
    
  )
}
