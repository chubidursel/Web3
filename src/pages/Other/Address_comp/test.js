// const mnemonic = '0satoshi ivoease mean predict abandon evoke tragic real glue'
// const value = 0

// if(mnemonic[0] != '0' || mnemonic.length < 30 || value > 0){
//     console.log(mnemonic[0] != '0')
//     console.log(mnemonic.length > 10)
//     console.log(value > 0)

//     console.log("here")
//   }

// console.log("Done")


import * as dotenv from 'dotenv' 
dotenv.config({ path: '../../../../.env' })

console.log('Start')

console.log(`🙋 Yooo we got it = ${process.env.INFURA_API}`)  
console.log(process.env.TEST)

console.log('Done!')

let numer = 21;

for(let i = 0; i < numer; i++){
    console.log(numer)
}