import React, {useState, useEffect} from 'react'
import { AuctionLot } from './AuctionLot';
import { ethers } from 'ethers';
import defaultProvider from '../../../../../abi/defaultProvider';
import { auctionPutAddress } from '../../../../../components/smart_contract/AuctionSingle';
import { contractAuctionFactory } from '../../../../../components/smart_contract/AuctionFactory';
import Modal from '../../../../../components/modal';
import Loader from '../../../../../components/loader';


export function ItemAuction() {
  const [display, setDisplay] = useState(false);
  const [arrAucWithProvider, setArrAucWithProvider] = useState([]);
  const [amountAuc, setAmountAuc] = useState();
  const [addressForCard, setAddressForCard] = useState([]);
  const [loader, setLoader] = useState(false)

  type infoAuction = {
    start : boolean
    end : boolean,
    tokenId : number;
    addressAuc : string
    closed: boolean;
  }
  
  const [all, setAll] = useState(true)

  useEffect((()=>{
    (async()=>{
      try {
        setLoader(true)
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
        const closedBid = await contractAuctionSingle.biddingClosed();

        let newAuc: infoAuction = {
          start : started,
          end : finished,
          addressAuc : addr,
          tokenId : tokenID.toString(),
          closed: closedBid,
        }

        arrAddressAuction.push(newAuc)
      }
      setArrAucWithProvider([...arrAddressAuction] as any)
        setLoader(false)
      } catch (error) {
        console.log(error)
      }
      
    })()
  }),[all])


  // const testingAuc = ()=>{
  //   console.log("Call func")
  //   console.log(arrAucWithProvider)
  // }

  const getCard = async(event) =>{
    setAddressForCard(event.target.value.split(','))
    console.log(addressForCard);
    setDisplay(true)
  }
// REFERENCE: https://www.sothebys.com/en/buy/auction/2021/natively-digital-a-curated-nft-sale-2?locale=en&lotFilter=AllLots
// EXPLANATION
// There are 3 states of a single Auction
// 1st -> Live  (started)
// 2nd -> Closed (Bidding is closed)
// 3nd -> Finished

  const listTx = arrAucWithProvider.map((el:infoAuction, id) =>{
    if(!el.start){
      return null; // DO NOT SHOW AUCTION THAT ARE NoT STARTED (but better show them and add button to start from moddel window)
    }
    return(<>
      <tr key={id} className='text-center'>
        {/* {
          el.end ? <td className='bg-red-300 text-center py-1'>error ❌</td> : el.end ? <td className='bg-green-300 text-center py-1'>finished 🏁</td> : <td className='bg-green-300 text-center py-1'> 🔴 live</td>
        } */}

        {
          (!el.closed && !el.end) ? <td className='bg-green-300 text-center py-1'>🔴 Live</td> :  (el.closed && !el.end) ? <td className='bg-pink-200 text-center py-1'>⌛ Closed</td> : <td className='bg-pink-300 text-center py-1'>🏁 Finished</td>
        }

        <td  className='px-3'>{el.tokenId}</td>
        <td>{el.addressAuc}</td>
        <td className='ml-5 font-bold'><button className='text-sm font-bold rounded-lg m-2 border-2 border-red-400 px-[15px] hover:bg-red-400' value={[el.addressAuc, el.tokenId.toString()]} onClick={getCard}>OPEN</button></td>
      </tr>
      
      </>
    )
  })

  return (
    <>
    {loader ? <Loader /> : 
    
    <div className='text-purple-800'>
    <h1 className='font-bold text-2xl  text-center mb-2'>total amount of Auction: {amountAuc}</h1>
<div className='flex justify-center'><button onClick={() => setAll(!all)} className='font-bold w-full m-2 rounded-xl border-2 border-red-400 px-[15px] hover:bg-red-400'>Refresh</button>
</div>

 <table className='bg-orange-100 rounded-xl w-full'>
       <tr className='bg-orange-300 text-center'>
       <th>Status</th>
         <th>ID</th>
         <th>Auction Address</th>
         <th>Show</th>
       </tr>
       {listTx}
     </table>
</div>
    }

     <Modal  active={display}
     setActive={setDisplay}
     marginFromTop={'top-1/4'}>
    <AuctionLot 
    tokenId = {addressForCard[1]}
    address = {addressForCard[0]}/>
    </Modal>
    </>
  )
}

