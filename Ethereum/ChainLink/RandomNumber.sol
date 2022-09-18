// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.7;

// import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
// import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

// contract RandomNumber is VRFConsumerBaseV2 {
//   VRFCoordinatorV2Interface COORDINATOR;

//   // Your subscription ID.
//   uint64 s_subscriptionId;

//   // Goerli coordinator. For other networks (infostructure contract)
//   address vrfCoordinator = 0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D;

//   // The gas lane to use, which specifies the maximum gas price to bump to.
//   // For a list of available gas lanes on each network,
//   // see https://docs.chain.link/docs/vrf-contracts/#configurations
//   bytes32 keyHash = 0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15;

//   // Depends on the number of requested values that you want sent to the
//   // fulfillRandomWords() function. Storing each word costs about 20,000 gas,
//   // so 100,000 is a safe default for this example contract. Test and adjust
//   // this limit based on the network that you select, the size of the request,
//   // and the processing of the callback request in the fulfillRandomWords()
//   // function.
//   uint32 callbackGasLimit = 100000;

//   // The default is 3, but you can set this higher.
//   uint16 requestConfirmations = 3;

//   // For this example, retrieve 2 random values in one request.
//   // Cannot exceed VRFCoordinatorV2.MAX_NUM_WORDS.
//   uint32 numWords =  2;

//   uint256[] public s_randomWords;
//   uint256 public s_requestId;
//   address s_owner;

//   constructor(uint64 subscriptionId) VRFConsumerBaseV2(vrfCoordinator) {
//     COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
//     s_owner = msg.sender;
//     s_subscriptionId = subscriptionId;
//   }

//   // Assumes the subscription is funded sufficiently.
//   function requestRandomWords() external approvedAdd{
//     // Will revert if subscription is not set and funded.
//     s_requestId = COORDINATOR.requestRandomWords(
//       keyHash,
//       s_subscriptionId,
//       requestConfirmations,
//       callbackGasLimit,
//       numWords
//     );
//   }

//   function fulfillRandomWords(
//     uint256, /* requestId */
//     uint256[] memory randomWords
//   ) internal override {
//     s_randomWords = randomWords;
//   }

//   modifier onlyOwner() {
//     require(msg.sender == s_owner);
//     _;
//   }


//   //My function 
//   mapping (address => bool) public aprovedAddres;

//   modifier approvedAdd(){
//     require(aprovedAddres[msg.sender] || msg.sender == s_owner, "Sorry, but u can't use this function =(");
//     _;
//   }

//   function setAddressToRequest(address _addr) external onlyOwner{
//     aprovedAddres[_addr] = true;
//   }

//   // function testRequest() external approvedAdd returns(uint _num){
//   //   return s_subscriptionId;
//   // }
// }