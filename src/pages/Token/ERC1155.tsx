import { useEffect, useState } from "react";
import Header from "../../components/headerNew";
import HeaderToken from "./ERC1155_comp/header1155";

import Modal from "../../components/modal";

import Gold from "../../../Ethereum/ERC1155/Pic/1.png";
import Silver from "../../../Ethereum/ERC1155/Pic/2.png";
import Bronze from "../../../Ethereum/ERC1155/Pic/3.png";
import Iron from "../../../Ethereum/ERC1155/Pic/4.png";

import NftCard from "./ERC1155_comp/nftCard";

export function ERC1155() {
  const [result, setResult] = useState();

  return (
    <>
      <Header marginFromTop={2}>
        <div className="text-center py-2">
          <h1 className="font-bold mb-2">Demo ERC1155 smart contract</h1>
          <p>📌 There are 4 coins with metadata Json files stored on IPFS</p>

          <a
            href="https://goerli.etherscan.io/address/0xa361b53deA0878fe9310B4ac941AFE3ba2C56a63#code"
            target="_blank"
            className="font-bold rounded-2xl border-2 border-red-400 px-[15px] py-2 text-xl hover:bg-red-400"
          >
            Etherscan{" "}
          </a>
        </div>
      </Header>

      <HeaderToken />

      <div className="flex justify-center m-10 space-between">
        <NftCard pic={Gold} title="Gold" id="1" setResult={setResult} />
        <NftCard pic={Silver} title="Silver" id="2" setResult={setResult} />
        <NftCard pic={Bronze} title="Bronze" id="3" setResult={setResult} />
        <NftCard pic={Iron} title="Iron" id="4" setResult={setResult} />
        </div>
        <div className="flex justify-center items-start">
          {result && (
            <h1 className="text-center text-2xl font-bold bg-orange-200 rounded-xl mt-3 py-4 px-2">
              {result}
            </h1>
          )}
        </div>
     
    </>
  );
}
