import React, {useState, useEffect} from 'react'
import { AuctionLot } from './AuctionLot';
import { ethers } from 'ethers';
import defaultProvider from '../../../../../abi/defaultProvider';
import { AuctionPutAddress, AuctionPutAddressSigner } from '../../../../../components/smart_contract/AuctionSingle';

export function ItemAuction({arr}) {
  const [display, setDisplay] = useState(false);
  const [arrAucWithProvider, setArrAucWithProvider] = useState([]);
  
  const abi = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_nft",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_seller",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_nftId",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Bid",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "winner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "End",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "Start",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "bidder",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Withdraw",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "bid",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "bids",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "end",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "endAt",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "ended",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "highestBid",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "highestBidder",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "nft",
      "outputs": [
        {
          "internalType": "contract IERC721",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "nftId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "seller",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_time",
          "type": "uint256"
        }
      ],
      "name": "start",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "started",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  // useEffect((()=>{
  //   (async()=>{
     
  //   })()
  // }),[])

  const testingAuc = ()=>{

     try {
        for (let i = 0; i <= arr.lenght; i++) {
          // let arrContractAuction = [];
          // arrContractAuction.push(AuctionPutAddress(arr[i]));
          // console.log(arrContractAuction)
          console.log("WE ARE HERE!")
          //setEventsLog(() => [... events] as any)
          const arrdSingle = arr[i]
          const contract = AuctionPutAddress(arrdSingle);

          console.log(contract.address)
          setArrAucWithProvider(() => [... contract as any] as any)
          console.log(arrAucWithProvider)
        }
      } catch (error) {
        console.log(error)
      }

  }



  const listTx = arr.map((el:any, id) =>{
    return(<>
      <tr key={id}>
        <td className='bg-green-300 text-center py-1'>Open</td>
        <td>{id}</td>
        <td>{el}</td>
        <td className='ml-5 font-bold'><button className='bg-orange-400 px-5' onClick={()=>{setDisplay(!display)}}>OPEN</button></td>
      </tr>
      
      </>
    )
  })

  return (
    <>
<button onClick={testingAuc} className='bg-red-500 w-full rounded-xl'>TEST</button>
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
    <AuctionLot />}
    </>
  )
}

