const { ethers } = require("hardhat");

// ----------  STEP #1 ---------------
// npx hardhat clean && npx hardhat compile && npx hardhat console

// > config


// ----------  STEP #2  deploy SC---------------
const [owner, otherAcc] = await ethers.getSigner()
const Demo = await ethers.getContractFactory("Demo")
const demo = await Demo.deploy()
await demo.deployed()

//  ----------  STEP #3  Functions---------------
demo.address //just check
let resultNumber = await demo.getNumber()
resultNumber.toString()

let trx = await demo.setNum(21)
let txRes = await tx.wait()
txRes   // all data about tx

txRes.logs

txRes.events // txRes.events[0].args

// EVENTS ----------  STEP #4 subscribe  ON --------------- 
demo.on("SetNumber", (who, number, time) => {console.log(who, number, time)});

// EVENTS----------  STEP #4  queryFilter  HISTORY --------------- 
await demo.queryFilter("SetNumber")
// ----------  STEP #5  FILTER --------------- 
const filter = demo.filters.WorkDone(owner.address) // for indexed param in the func