// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/*
   ______  ______               ______     ______  
 .' ___  ||_   _ `.           .' ____ \  .' ___  | 
/ .'   \_|  | | `. \  ______  | (___ \_|/ .'   \_| 
| |         | |  | | |______|  _.____`. | |        
\ `.___.'\ _| |_.' /          | \____) |\ `.___.'\ 
 `.____ .'|______.'            \______.' `.____ .' 
   ChubiDuracell                 smart contract
*/


import "../node_modules/@chainlink/contracts/src/v0.8/VRFV2WrapperConsumerBase.sol";

contract FlipCoin is VRFV2WrapperConsumerBase {

      uint entryFees = 0.001 ether;

      uint8 public testNumForBet = 1 | 2; // DEMO DELETE;

      struct CoinFlipResult{
        uint256 fees;
        uint256 randomword;
        address player;
        bool didwin;
        bool fulfiled;
        CoinChoise choise;
      }
      enum CoinChoise{
        Head,
        Tail
      }





      //-------------- ChainLink Func---------------
      event RequestSent(uint256 requestId, uint32 numWords);
      event RequestFulfilled(
        uint256 requestId,
        uint256[] randomWords,
        uint256 payment
      );

    struct RequestStatus {
        uint256 paid; // amount paid in link
        bool fulfilled; // whether the request has been successfully fulfilled
        uint256[] randomWords;
    }
    mapping(uint256 => RequestStatus)
        public s_requests; /* requestId --> requestStatus */

    // past requests Id.
    uint256[] public requestIds;
    uint256 public lastRequestId;

    uint32 callbackGasLimit = 100000;

    uint16 requestConfirmations = 3; // how many blokcs will confirm

    uint32 numWords = 1;

    
    address linkAddress = 0x326C977E6efc84E512bB9C30f76E30c160eD06FB; // chainLink token

    address wrapperAddress = 0x708701a1DfF4f478de54383E49a627eD4852C816;

    constructor()VRFV2WrapperConsumerBase(linkAddress, wrapperAddress) {} // should be payble to put some funds 

    function requestRandomWords()
        external
        returns (uint256 requestId)
    {
        requestId = requestRandomness(
            callbackGasLimit,
            requestConfirmations,
            numWords
        );
        s_requests[requestId] = RequestStatus({
            paid: VRF_V2_WRAPPER.calculateRequestPrice(callbackGasLimit),
            randomWords: new uint256[](0),
            fulfilled: false
        });
        requestIds.push(requestId);
        lastRequestId = requestId;
        emit RequestSent(requestId, numWords);
        return requestId;
    }

// you will get ou random number here
    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory _randomWords
    ) internal override {
        require(s_requests[_requestId].paid > 0, "request not found");
        s_requests[_requestId].fulfilled = true;
        s_requests[_requestId].randomWords = _randomWords;
        emit RequestFulfilled(
            _requestId,
            _randomWords,
            s_requests[_requestId].paid
        );

        // COMPARE RANDOM NUMBER HERE <<<<<<<<<<<<<<<<<<<<<<<<<<<<
        if(_randomWords[0] % 2 == 0){
          // result payble
        }


    }

    function getRequestStatus(
        uint256 _requestId
    )
        external
        view
        returns (uint256 paid, bool fulfilled, uint256[] memory randomWords)
    {
        require(s_requests[_requestId].paid > 0, "request not found");
        RequestStatus memory request = s_requests[_requestId];
        return (request.paid, request.fulfilled, request.randomWords);
    }

    /**
     * Allow withdraw of Link tokens from the contract
     */
    function withdrawLink() public {
        LinkTokenInterface link = LinkTokenInterface(linkAddress);
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }



//////// Aditional func  (play for free) \\\\\\\\\
function pseudoRandom() public view returns(uint256) {
    return uint256(keccak256(abi.encodePacked(
      tx.origin, 
      blockhash(block.number - 1), 
      block.timestamp)));
    }
}


 

//https://medium.com/coinmonks/how-to-generate-random-numbers-in-solidity-16950cb2261d