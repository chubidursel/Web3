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

// DO NOT FORGET TO SEND CHAINLINK TOKEN
// 0x317Be966fDA9b869A1743ceE9d85C515bb383bC1  << V1
// 0xB7B395a2dDDd85a39A19c29FFFE747486C0b9090   << V2
// 0.29879

import "../node_modules/@chainlink/contracts/src/v0.8/VRFV2WrapperConsumerBase.sol";

contract FlipCoin is VRFV2WrapperConsumerBase {

      uint public entryFees = 0.001 ether; //Change to our token instead

      struct CoinFlipStatus{
        uint256 paid; // chainLinkk
        uint256 randomword;
        address player;
        bool didwin;
        bool fulfiled;
        CoinChoise choise;
        //uint bet; // <<<< my var || how much tokens does player bet
      }
    mapping(uint => CoinFlipStatus) public status;

    uint public lastID;
    uint16 public amountOfGames;

    enum CoinChoise{
        Head,
        Tail
      }


    event Result(uint time, address indexed who, bool didWin);
    event Flip(uint bet, uint time, address indexed who);
    
    function flip(CoinChoise _choise, bool fromChainLink) public payable{
        require(msg.value >= entryFees, "Not enought funds! ");

    // There are two option where u can get random number from ChainLink or generete in Solidity, player can choose=>
        if(fromChainLink){
          //---------------OPTION1 (tru chainLink)
            uint _requestId = requestRandomWords(); // call this func to get the requests for rendom num
            
            status[_requestId] = CoinFlipStatus({
                paid: VRF_V2_WRAPPER.calculateRequestPrice(callbackGasLimit),
                randomword: 0,
                player: msg.sender,
                didwin: false,
                fulfiled: false,
                choise: _choise
            });
        } else{
          //-----------------OPTION2 (free | not secure)
          uint _requestId = _pseudoRandom();

          status[_requestId] = CoinFlipStatus({
            paid: 777,
            randomword: _requestId,
            player: msg.sender,
            didwin: false,
            fulfiled: true,
            choise: _choise
          });
        }

        emit Flip(msg.value, block.timestamp, msg.sender);
      }

    function _result(uint _random, uint _id) internal {

        amountOfGames++;

        CoinChoise res = CoinChoise.Head;

        if(_random % 2 == 0){
             res = CoinChoise.Tail;
            }

        if(status[_id].choise == res){
            status[_id].didwin = true;

            bool sent = payable(status[_id].player).send(entryFees * 2);
            require(sent, "Opps, Failed! Can't send ETH");
        }

        emit Result(block.timestamp, msg.sender, status[_id].didwin);
      }


      //-------------- ChainLink Func---------------

    uint32 callbackGasLimit = 1_000_000;
    uint16 requestConfirmations = 3; // how many blokcs will confirm
    uint32 numWords = 1;
    address linkAddress = 0x326C977E6efc84E512bB9C30f76E30c160eD06FB; // chainLink token
    address wrapperAddress = 0x708701a1DfF4f478de54383E49a627eD4852C816;

    constructor()VRFV2WrapperConsumerBase(linkAddress, wrapperAddress) {
      owner = msg.sender;
    } // should be payble to put some funds 

    function requestRandomWords() internal returns (uint256 requestId){
        requestId = requestRandomness(
            callbackGasLimit,
            requestConfirmations,
            numWords
        );

        lastID = requestId;

        return requestId;
    }

// you will get ou random number here
    function fulfillRandomWords(uint256 _requestId, uint256[] memory _randomWords) internal override {
        //require(status[_requestId].paid > 0, "request not found");
        
        status[_requestId].fulfiled = true;
        status[_requestId].randomword = _randomWords[0];

        // MY FUNC
        _result(_randomWords[0], _requestId);
    }

    function getRequestStatus(uint256 _requestId) external view returns (uint256 paid, bool fulfilled, bool win){
        require(status[_requestId].paid > 0, "request not found");
        CoinFlipStatus memory request = status[_requestId];
        return (request.paid, request.fulfiled, request.didwin);
    }

    //--------------- GET BACK UR FUNDS ETH AND CHAINLINL -----------------------------
    address owner;
    modifier onlyOwner(){
      require(msg.sender == owner, "You arent an owner!");
      _;
    }

    function withdrawLink() public onlyOwner{
        LinkTokenInterface link = LinkTokenInterface(linkAddress);
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }
    function withdrETH() public onlyOwner{
        payable(msg.sender).transfer(address(this).balance);
    }

    function setUpBet(uint _new) external onlyOwner{
      entryFees = _new;
    }

//////// Aditional func  (play for free) \\\\\\\\\
function _pseudoRandom() private returns(uint256 randomNum) {
    uint256 num = uint256(keccak256(abi.encodePacked(
      tx.origin, 
      blockhash(block.number - 1), 
      block.timestamp)));

      lastID = num; 

      _result(num, num);

      return num;
    }

  fallback() external payable{}
  receive() external payable {}
}
