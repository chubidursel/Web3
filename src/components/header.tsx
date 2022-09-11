import { useState, useEffect, useContext } from "react";
import walletProvider from "../abi/walletProvider";
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { Context } from "../contexts/context";


//1) ПЕРЕПИСАТЬ ФУНКЦИИ СТЕЙТА В ХЕНДЛЕРЫ 2) РАЗОБРАТЬСЯ С ПОДСКАЗКОЙ 3) ДОВЕСТИ ДО УМА КНОПКУ РАЗЛОГИНА

declare let window: any;


const Header = () => {

  const { currentAccount, setCurrentAccount } = useContext(Context);
  const [isLogOutVisible, setLogOutVisible] = useState(false);

  useEffect(() => {
    window.ethereum.on("accountsChanged", (accounts: any) => {
      console.log(accounts);
      setCurrentAccount(accounts[0]);
    });
    window.ethereum.on("chainChanged", (chainId: any) => {
      if (chainId !== "0x4") {
        setCurrentAccount("");
      }
    });

    // return () => {
    //   window.ethereum.removeListener("accountsChanged");
    //   window.ethereum.removeListener("chainChanged");
    // };
  }, []);

  const handleMetamaskConnect = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x4" }],
      });
      const accounts = await walletProvider.send("eth_requestAccounts", []);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="flex relative justify-between p-4">
      {currentAccount ? (
  
    <span
          className="absolute right-0 mr-6 flex rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400"
          onClick={() => setLogOutVisible(!isLogOutVisible)}
        >
        <Jazzicon diameter={30} seed={jsNumberForAddress(currentAccount)}/>
          {currentAccount.toString().slice(0, 5) +
            "..." +
            currentAccount.toString().slice(38)}
        </span>
      ) : (
        <button
          className="absolute right-0 mr-6 rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400"
          onClick={handleMetamaskConnect}
        >
          Connect Metamask
        </button>
      )}
      {isLogOutVisible && (
        <div className="absolute right-12 top-20">
          <button className = 'rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400'
            onClick={() => {
              setCurrentAccount("");
              setLogOutVisible(false);
            }}
          >
            Log out
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
