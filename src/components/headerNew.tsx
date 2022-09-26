import { useState, useEffect } from "react";
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { LogoutIcon } from "../icons/LogoutIcon";
import { useAppContext } from "../hooks/useAppContext";
import connectMetamask from "../utils/connectMetamask";
import disconnectMetamask from "../utils/disconnectMetamask";
import { Link } from "react-router-dom";
import Modal from "./modal";



declare let window: any;

const Header = ({children}) => {
  const [active, setActive] = useState(false);
  const [isLogOutVisible, setLogOutVisible] = useState(false);
  const { contextState, updateContextState } = useAppContext();
  const currentAccount = contextState?.currentAccount;

useEffect(() => {
    const { ethereum } = window;
    const handleChangeAccount = (accounts) => {
      updateContextState({ currentAccount: accounts[0] });
    };
    const handleChangeNetwork = (chainId) => {
      if (chainId != "0x5") {
        disconnectMetamask(updateContextState);
      }
    };
    if (ethereum) {
      ethereum.on("accountsChanged", handleChangeAccount);
      ethereum.on("chainChanged", handleChangeNetwork);
      return () => {
        ethereum.removeListener("accountsChanged", handleChangeAccount);
        ethereum.removeListener("chainChanged", handleChangeNetwork);
      };
    }
  }, []);


const handleConnectMetamaskClick  = async () => {
    connectMetamask(updateContextState);
  };

  const handleDisconnectMetamaskClick = async () => {
    setLogOutVisible(false);
    disconnectMetamask(updateContextState);
  };

  const handleModal = () => setActive(true)


  const [isTokenVisible, setTokenVisible] = useState(false);
  const [isDefiVisible, setDefiVisible] = useState(false);
  const [isOtherVisible, setOtherVisible] = useState(false);
const tokenMenu = [{nam: "ERC20", path:"../Token/ERC20"}, {nam: 'ERC721', path:'../Token/ERC721'}, {nam: "ERC1151", path:"../Coming_soon"}]
const defiMenu = [{nam: "Exchange", path:"../Defi/exchange"}, {nam: 'Vault', path:'../Defi/vault'}, {nam: "Swap", path:"../Coming_soon"}, {nam: "ChainLink", path:"../ChainLink"}, {nam: "DAO", path:"../DAO"}, {nam: "Auction", path:"../Defi/components/Market/Auction"}]
const otherMenu = [{nam: "Converter", path:"../Other/converter"}, {nam: "Game", path:"../Coming_soon"}, {nam: 'Proxy', path:'../Other/Proxy'}]




  return (
        <div className="text-2xl text-white ">
          <header className="flex relative justify-center p-4 font-semibold">
            <nav className="rounded-2xl border-2 border-red-400 opacity-40 hover:opacity-100  hover:px-10 ">
          <ul className="flex space-x-8  font-semibold">
            <li>
            <Link to="../" className="block py-2 pr-4 pl-3 rounded hover:bg-transparent hover:text-pink-400">Home</Link> 
            </li>
            <li>
            <Link to="../Token" onMouseEnter={() => setTokenVisible(!isTokenVisible)}
            className="block py-2 pr-4 pl-3 rounded md:hover:bg-transparent md:hover:text-pink-400">Tokens</Link>
            </li>
            <li>
            <Link to="../Defi" onMouseEnter={() => setDefiVisible(!isDefiVisible)}
            className="block py-2 pr-4 pl-3 text-white rounded md:hover:bg-transparent md:hover:text-pink-400">DeFi</Link>
            </li>
            <li>
            <Link to="../Other" onMouseEnter={() => setOtherVisible(!isOtherVisible)}
            className="block py-2 pr-4 pl-3 rounded md:hover:bg-transparent md:hover:text-pink-400">Other</Link>
            </li>  
            <li>
            <button onClick={handleModal} className="block py-2 pr-4 pl-3 rounded md:hover:bg-transparent md:hover:text-pink-400 animate-pulse">FAQ</button>
            </li>
            </ul>
      </nav>
      {isTokenVisible && (
        <div onMouseLeave={() => setTokenVisible(!isTokenVisible)}
        className="w-1/2 top-1 h-14 flex flex-row font-semibold absolute opacity-100 mt-2 rounded-md bg-blue-100"
        >
           {tokenMenu.map(el => (<Link to={el.path} className="w-full text-center align-content-center text-pink-700 block px-4 py-2 text-2xl  hover:bg-pink-400 rounded-md">{el.nam}</Link>))} 
       </div>
      )}

{isDefiVisible && (
        <div onMouseLeave={() => setDefiVisible(!isDefiVisible)}
        className="w-1/2 h-14 top-2 flex flex-row font-semibold absolute opacity-100 mt-2 rounded-md bg-blue-100">
            {defiMenu.map(el => (<Link to={el.path} className="w-full text-center text-pink-700 block px-4 py-2 text-2xl  hover:bg-pink-400 rounded-md">{el.nam}</Link>))} 
       </div>
      )}

{isOtherVisible && (
        <div onMouseLeave={() => setOtherVisible(!isOtherVisible)}
        className="w-1/2 h-14 top-2 flex flex-row font-semibold absolute opacity-100 mt-2 rounded-md bg-blue-100">
           {otherMenu.map(el => (<Link to={el.path} className="w-full text-center text-pink-700 block px-4 py-2 text-2xl  hover:bg-pink-400 rounded-md">{el.nam}</Link>))} 
       </div>
      )}



      {currentAccount ? (
  <>
    <span
          className="absolute right-0 mr-6 flex rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400"
          onClick={() => setLogOutVisible(!isLogOutVisible)}
        >
        <Jazzicon diameter={30} seed={jsNumberForAddress(currentAccount)}/>
          <div className="ml-1">{currentAccount.toString().slice(0, 5) +
            "..." +
            currentAccount.toString().slice(38)}</div>
            <button className="ml-3"
            type="button" onClick={handleDisconnectMetamaskClick}>
        <LogoutIcon />
      </button>
        </span>
       
      </>
      ) : (
        <button
          className="absolute right-0 mr-6 rounded-2xl border-2 border-red-400 px-[15px] py-2 font-semibold text-xl hover:bg-red-400"
          onClick={handleConnectMetamaskClick}
        >
          Connect Metamask
        </button>
      )}
    </header>
    <Modal 
    active={active}
    setActive={setActive}
    >{children}</Modal>
</div>
  );
};

export default Header;


