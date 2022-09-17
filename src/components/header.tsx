// import { useState, useEffect, useContext } from "react";
// import walletProvider from "../abi/walletProvider";
// import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
// import { Context } from "../contexts/context";
// import { LogoutIcon } from "../icons/LogoutIcon";


// //2) РАЗОБРАТЬСЯ С ПОДСКАЗКОЙ 3) ДОВЕСТИ ДО УМА КНОПКУ РАЗЛОГИНА - кнопка есть, но сука зеленая:)

// declare let window: any;

// const Header = () => {
//   const { currentAccount, setCurrentAccount } = useContext(Context);
//   const [isLogOutVisible, setLogOutVisible] = useState(false);

//   useEffect(() => {
//     window.ethereum.on("accountsChanged", (accounts: any) => {
//       console.log(accounts);
//       setCurrentAccount(accounts[0]);
//     });
//     window.ethereum.on("chainChanged", (chainId: any) => {
//       if (chainId !== "0x4") {
//         setCurrentAccount("");
//       }
//     });

//     // return () => {
//     //   window.ethereum.removeListener("accountsChanged");
//     //   window.ethereum.removeListener("chainChanged");
//     // };
//   }, []);

//   const handleMetamaskConnect = async () => {
//     try {
//       await window.ethereum.request({
//         method: "wallet_switchEthereumChain",
//         params: [{ chainId: "0x4" }],
//       });
//       const accounts = await walletProvider.send("eth_requestAccounts", []);
//       setCurrentAccount(accounts[0]);
//     } catch (error) {
//       console.error(error);
//     }
//   };

// const handleLogOut = () => {
//   setCurrentAccount("");
//   setLogOutVisible(false);
// }

//   return (
//     <header className="flex relative justify-between p-4 font-semibold">
//       {currentAccount ? (
//   <>
//     <span
//           className="absolute right-0 mr-6 flex rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400"
//           onClick={() => setLogOutVisible(!isLogOutVisible)}
//         >
//         <Jazzicon diameter={30} seed={jsNumberForAddress(currentAccount)}/>
//           <div className="ml-1">{currentAccount.toString().slice(0, 5) +
//             "..." +
//             currentAccount.toString().slice(38)}</div>
//             <button className="text-black ml-3"
//             type="button" onClick={handleLogOut}>
//         <LogoutIcon />
//       </button>
//         </span>
       
//       </>
//       ) : (
//         <button
//           className="absolute right-0 mr-6 rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400"
//           onClick={handleMetamaskConnect}
//         >
//           Connect Metamask
//         </button>
//       )}
//     </header>
//   );
// };

// export default Header;
