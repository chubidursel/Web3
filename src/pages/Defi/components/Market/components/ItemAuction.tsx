import React, {useState, useEffect} from 'react'
import { AuctionLot } from './AuctionLot';
import { ethers } from 'ethers';
import defaultProvider from '../../../../../abi/defaultProvider';
import { auctionPutAddress, auctionPutAddressSigner } from '../../../../../components/smart_contract/AuctionSingle';
import { contractAuctionFactory, contractAuctionFactoryWithSigner } from '../../../../../components/smart_contract/AuctionFactory';
import Modal from '../../../../../components/modal';


export function ItemAuction() {
  const [display, setDisplay] = useState(false);
  const [arrAucWithProvider, setArrAucWithProvider] = useState([]);
  const [amountAuc, setAmountAuc] = useState();
  const [addressForCard, setAddressForCard] = useState();


  type infoAuction = {
    condition : boolean,
    tokenId : number;
    addressAuc : string
  }
  

  // UPDATE ALL 
  useEffect((()=>{
    (async()=>{
      try {
        let arrIndex = await contractAuctionFactory.getLenght()
      const index = arrIndex.toString()
      setAmountAuc(index)

      let arrAddressAuction = [];
      for (let i = 0; i <= index -1 ; i++) {
        let addr = await contractAuctionFactory.listOfAuctions(i)

        let newAuc: infoAuction = {
          condition : true,
          addressAuc : addr,
          tokenId : 21,
        }
        arrAddressAuction.push(newAuc)
      }
      setArrAucWithProvider([...arrAddressAuction] as any)
        
      } catch (error) {
        console.log(error)
      }
      
    })()
  }),[])

  const arr = ["sdcsdc", "dscsdcsdc"]

  const testingAuc = ()=>{
    console.log("Call func")
    console.log(arrAucWithProvider)
  }

  const getCard = async(event) =>{
    setDisplay(!display)
    setAddressForCard(event.target.value)
  }



  const listTx = arrAucWithProvider.map((el:any, id) =>{
    return(<>
      <tr key={id} className='text-center'>
        <td className='font-bold text-green-500 py-1'>Open</td>
        <td>{el.tokenId}</td>
        <td>{el.addressAuc}</td>
        <td className='ml-5 font-bold'><button className='text-sm font-bold rounded-2xl m-2 border-2 border-red-400 px-[15px] hover:bg-red-400' value={el.addressAuc} onClick={getCard}>OPEN</button></td>
      </tr>
      
      </>
    )
  })

  return (
    <>
       <div className='text-purple-800'>

<div className='flex justify-center'><button onClick={testingAuc} className='font-bold w-1/3 m-2 rounded-2xl border-2 border-red-400 px-[15px] hover:bg-red-400'>TEST</button>
</div>
<h1 className='font-bold mb-2'>total amount of Auction: {amountAuc}</h1>
    <table className='bg-orange-100 rounded-xl w-full'>
          <tr className='bg-orange-300 text-center'>
          <th>Type</th>
            <th>Token ID</th>
            <th>Address</th>
            <th>OPEN</th>
          </tr>
          {listTx}
        </table>
</div>

    {display &&
     <Modal  active={display}
     setActive={setDisplay}>
    <AuctionLot address = {addressForCard}/>
    </Modal>
    }
    </>
  )
}

