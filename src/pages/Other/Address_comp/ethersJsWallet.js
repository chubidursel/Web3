import { ethers } from "ethers";

export function newWallet() {
  const wallet = ethers.Wallet.createRandom();

  const response = {
    privateKey: wallet.privateKey,
    publicKey: wallet.publicKey,
    address: wallet.address,
    mnemonic: wallet._mnemonic().phrase,
  };
  //console.log(response)
  return response
}

newWallet()