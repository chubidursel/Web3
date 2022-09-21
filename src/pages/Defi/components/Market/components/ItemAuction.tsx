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
      <tr key={id}>
        <td className='bg-green-300 text-center py-1'>Open</td>
        <td>{el.tokenId}</td>
        <td>{el.addressAuc}</td>
        <td className='ml-5 font-bold'><button className='bg-orange-400 px-5' value={el.addressAuc} onClick={getCard}>OPEN</button></td>
      </tr>
      
      </>
    )
  })

  return (
    <>
<button onClick={testingAuc} className='bg-red-500 w-full rounded-xl'>TEST</button>
<h1>total amount of Auction: {amountAuc}</h1>
    <table className='bg-orange-100 w-full rounded-xl'>
          <tr className='bg-orange-300'>
          <th>Type</th>
            <th>token ID</th>
            <th>Address</th>
            <th>OPEN</th>
          </tr>
          {listTx}
        </table>


    {display &&
     <Modal  active={display}
     setActive={setDisplay}>
    <AuctionLot address = {addressForCard}/>
    </Modal>
    }
    </>
  )
}

