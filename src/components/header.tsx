import { useState, useEffect } from "react";
import walletProvider from "../abi/walletProvider";
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
declare let window: any;


const Header = () => {
  
 
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLogOutVisible, setLogOutVisible] = useState(false);

  // useEffect(() => {
  //   window.ethereum.on("accountsChanged", (accounts: any) => {
  //     console.log(accounts);
  //     setCurrentAccount(accounts[0]);
  //   });
  //   window.ethereum.on("chainChanged", (chainId: any) => {
  //     if (chainId !== "0x4") {
  //       setCurrentAccount("");
  //     }
  //   });

  //   return () => {
  //     window.ethereum.removeListener("accountsChanged");
  //     window.ethereum.removeListener("chainChanged");
  //   };
  // }, []);

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
    // надо переписать на тайлвинд
    <header
      style={{
        display: "flex",
        position: "relative",
        justifyContent: "space-between",
        padding: "16px",
      }}
    >
     
      {currentAccount ? (
        // <h1 onClick={() => setLogOutVisible(!isLogOutVisible)}>
        //   {currentAccount}
        // </h1>


<span
          className="absolute right-0 mr-6 flex rounded-2xl border-2 border-green-700 px-[15px] py-2 text-xl hover:bg-green-700"
          onClick={() => setLogOutVisible(!isLogOutVisible)}
        >
          <Jazzicon diameter={25} seed={jsNumberForAddress(currentAccount)} />
          {currentAccount.toString().slice(0, 5) +
            "..." +
            currentAccount.toString().slice(38)}
        </span>



      ) : (
        <button onClick={handleMetamaskConnect}>Connect to metamask</button>
      )}
      {isLogOutVisible && (
        <div style={{ position: "absolute", right: "30px", top: "80px" }}>
          <button
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
