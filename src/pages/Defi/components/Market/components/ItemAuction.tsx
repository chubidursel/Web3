import React, {useState, useEffect} from 'react'
import { AuctionLot } from './AuctionLot';
import { ethers } from 'ethers';
import defaultProvider from '../../../../../abi/defaultProvider';
import { auctionPutAddress } from '../../../../../components/smart_contract/AuctionSingle';
import { contractAuctionFactory } from '../../../../../components/smart_contract/AuctionFactory';
import Modal from '../../../../../components/modal';


export function ItemAuction() {
  const [display, setDisplay] = useState(false);
  const [arrAucWithProvider, setArrAucWithProvider] = useState([]);
  const [amountAuc, setAmountAuc] = useState();
  const [addressForCard, setAddressForCard] = useState();


  type infoAuction = {
    start : boolean
    end : boolean,
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
        
        const contractAuctionSingle = auctionPutAddress(addr);
        const tokenID = await contractAuctionSingle.nftId()
        const finished = await contractAuctionSingle.ended()
        const started = await contractAuctionSingle.started()

        let newAuc: infoAuction = {
          start : started,
          end : finished,
          addressAuc : addr,
          tokenId : tokenID.toString(),
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
        {
          !el.start ? <td className='bg-gray-300 text-center py-1'>error ❌</td> : el.end ? <td className='bg-red-300 text-center py-1'>finished</td> : <td className='bg-green-300 text-center py-1'>live</td>
        }
        <td>{el.tokenId}</td>
        <td>{el.addressAuc}</td>
        <td className='ml-5 font-bold'><button className='text-sm font-bold rounded-xl m-2 border-2 border-red-400 px-[15px] hover:bg-red-400' value={el.addressAuc} onClick={getCard}>OPEN</button></td>
      </tr>
      
      </>
    )
  })

  return (
    <>
       <div className='text-purple-800'>
       <h1 className='font-bold text-2xl  text-center mb-2'>total amount of Auction: {amountAuc}</h1>
<div className='flex justify-center'><button onClick={testingAuc} className='font-bold w-full m-2 rounded-xl border-2 border-red-400 px-[15px] hover:bg-red-400'>Refresh</button>
</div>

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

