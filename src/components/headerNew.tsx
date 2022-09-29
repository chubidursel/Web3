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
  if(!window.ethereum){
    alert("Hold on, You do not have MetaMask here? 🤔 ")
  }
    try {
      connectMetamask(updateContextState);
    } catch (error) {
      console.log(error)
    }
  };

  const handleDisconnectMetamaskClick = async () => {
    setLogOutVisible(false);
    disconnectMetamask(updateContextState);
  };

  const handleModal = () => setActive(true)

  return (
        <div className="text-2xl text-white ">
          <header className="flex relative justify-center p-4 font-semibold">
            <nav className="rounded-2xl border-2 border-red-400 opacity-40 hover:opacity-100  hover:px-10 ">
          <ul className="flex space-x-8  font-semibold">
            <li>
            <Link to="../" className="block py-2 pr-4 pl-3 rounded hover:bg-transparent hover:text-pink-400">Home</Link> 
            </li>
            <li>
            <Link to="../Token" 
            className="block py-2 pr-4 pl-3 rounded md:hover:bg-transparent md:hover:text-pink-400">Tokens</Link>
            </li>
            <li>
            <Link to="../Defi" className="block py-2 pr-4 pl-3 text-white rounded md:hover:bg-transparent md:hover:text-pink-400">DeFi</Link>
            </li>
            <li>
            <Link to="../Other" className="block py-2 pr-4 pl-3 rounded md:hover:bg-transparent md:hover:text-pink-400">Other</Link>
            </li>  
            <li>
            <button onClick={handleModal} className="block py-2 pr-4 pl-3 rounded md:hover:bg-transparent md:hover:text-pink-400 animate-pulse">FAQ</button>
            </li>
            </ul>
      </nav>
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