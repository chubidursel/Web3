// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

/*
   ______  ______               ______     ______  
 .' ___  ||_   _ `.           .' ____ \  .' ___  | 
/ .'   \_|  | | `. \  ______  | (___ \_|/ .'   \_| 
| |         | |  | | |______|  _.____`. | |        
\ `.___.'\ _| |_.' /          | \____) |\ `.___.'\ 
 `.____ .'|______.'            \______.' `.____ .' 
   ChubiDuracell                 smart contract
*/

interface IERC721 {
    function safeTransferFrom(
        address from,
        address to,
        uint tokenId
    ) external;

    function transferFrom(
        address,
        address,
        uint
    ) external;

    function ownerOf(uint) external view returns(address);
}

contract AuctionFactory{
    event CreatedAuction(address auction, address owner, uint time);
    
    IERC721 public nft;

    constructor( address _nft) {
        nft = IERC721(_nft);
    }

    address[] public listOfAuctions;
    address public lastDeploed;
    
    function getLenght()public view returns(uint){
        return listOfAuctions.length;
    }

    modifier nftHolder(uint _id){
        require(msg.sender == nft.ownerOf(_id), "Yo yo, this is not ur NFT!");
        _;
    }

    function createAuction(uint tokenId) external nftHolder(tokenId){
        address newAction = address(new NftAuction(address(nft), payable(msg.sender), tokenId));
        listOfAuctions.push(newAction);
        emit CreatedAuction(newAction, msg.sender, block.timestamp);
        
        lastDeploed = newAction;       
    }
}

contract NftAuction {
    event Start();
    event Bid(address indexed sender, uint amount);
    event Withdraw(address indexed bidder, uint amount);
    event End(address winner, uint amount);

    IERC721 public nft;
    uint public nftId;

    address payable public seller;
    uint public endAt; 
    uint amountHours;
    bool public started;
    bool public ended;

    address public highestBidder;
    uint public highestBid;
    mapping(address => uint) public bids;
    address[] public bidders;

    constructor(address _nft, address _seller, uint _nftId) {
        nft = IERC721(_nft);
        nftId = _nftId;

        seller = payable(_seller);
        highestBid = 0.001 ether;
    }

    function start(uint _time) external  {
        require(!started, "started");
        require(msg.sender == seller, "not seller");

        amountHours = _time * 1 minutes;

        nft.transferFrom(msg.sender, address(this), nftId);
        started = true;
        endAt = block.timestamp + amountHours;

        emit Start();
    }

    function bid() external payable {
        require(started, "not started");
        require(block.timestamp < endAt, "ended");
        require(msg.value > highestBid, "value < highest");

        if (highestBidder != address(0)) {
            bids[highestBidder] += highestBid;
            bidders.push(highestBidder);
        }

        highestBidder = msg.sender;
        highestBid = msg.value;

        emit Bid(msg.sender, msg.value);
    }

    function biddingClosed()public view returns(bool){
        return block.timestamp >= endAt;
    }

    function end() external {
        require(started, "not started");
        require(block.timestamp >= endAt, "Auction is still going...");
        require(!ended, "ended");

        ended = true;

        // NFT transfer
        if (highestBidder != address(0)) {
            nft.safeTransferFrom(address(this), highestBidder, nftId);
            seller.transfer(highestBid);
        } else {
            nft.safeTransferFrom(address(this), seller, nftId);
        }

        // FUNDS transfer
           for(uint i = 0; i <= bidders.length - 1; i++){
               uint fundReturn = bids[bidders[i]];
                payable(bidders[i]).transfer(fundReturn);

                emit Withdraw(msg.sender, fundReturn);
            }


        emit End(highestBidder, highestBid);
    }
}