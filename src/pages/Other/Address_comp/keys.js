import crypto from "crypto";
import  {publicKeyCreate}  from 'secp256k1';
const keccak256 = require('keccak256');


const privateK = ()=>{
    const privateKey= crypto.randomBytes(32).toString("hex");

    console.log(privateKey)
    console.log(privateKey.length)
    console.log(typeof privateKey)

    return privateKey
}


const publicK = () => {
    const privateKey = privateK();

    const privateKeyBuffer = Buffer.from(privateKey, 'hex');

    const publicKey = Buffer.from(publicKeyCreate(privateKeyBuffer, false)).toString('hex');

    //dont forget to cut off prefix 04
    console.log('Public Key: ', publicKey);
}

const address = () => {

    const publicKey = publicK()

    const publicKeyBuffer = Buffer.from(publicKey, 'hex');

    const ethereumAddress = keccak256(publicKeyBuffer).toString('hex').slice(64 - 40);
    
    console.log('Ethereum Address: ', '0x' + ethereumAddress);
    
}






