import { useState, useEffect } from "react";
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { LogoutIcon } from "../icons/LogoutIcon";
import { useAppContext } from "../hooks/useAppContext";
import connectMetamask from "../utils/connectMetamask";
import disconnectMetamask from "../utils/disconnectMetamask";



declare let window: any;

const Header = () => {

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


  return (
    <header className="flex relative justify-between p-4 font-semibold">
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
            <button className="text-black ml-3"
            type="button" onClick={handleDisconnectMetamaskClick}>
        <LogoutIcon />
      </button>
        </span>
       
      </>
      ) : (
        <button
          className="absolute right-0 mr-6 rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400"
          onClick={handleConnectMetamaskClick}
        >
          Connect Metamask
        </button>
      )}
    </header>
  );
};

export default Header;


