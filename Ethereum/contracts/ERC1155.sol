// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

/*
   ______  ______               ______     ______  
 .' ___  ||_   _ `.           .' ____ \  .' ___  | 
/ .'   \_|  | | `. \  ______  | (___ \_|/ .'   \_| 
| |         | |  | | |______|  _.____`. | |        
\ `.___.'\ _| |_.' /          | \____) |\ `.___.'\ 
 `.____ .'|______.'            \______.' `.____ .' 
   ChubiDuracell                 smart contract
*/


import "../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/security/Pausable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "../node_modules/@openzeppelin/contracts/utils/Strings.sol";


contract MyCoin is ERC1155, Ownable, Pausable, ERC1155Supply {

    uint256 price = 0.01 ether;
    uint16 maxSupply = 1000;
    uint8 amountNFT = 5;

    mapping(uint8 => uint256) public tokenPrice;

    uint8 public constant GOLD = 1;
    uint8 public constant SILVER = 2;
    uint8 public constant BRONZE = 3;
    uint8 public constant IRON = 4;
    uint8 public constant BTC = 5;

    constructor()
        ERC1155("ipfs://QmcoJagvx5dBV3VeUDsJFZeGZrrWNHxd9txjfyj9b6kNYg/")
    {
        tokenSupplyLimit[BTC] = 5;
        tokenSupplyLimit[GOLD] = 100;
        tokenSupplyLimit[SILVER] = 500;
        tokenSupplyLimit[BRONZE] = 1000;
        tokenSupplyLimit[IRON] = 5000;
        

        _mint(msg.sender, IRON, 100, '');

        //seting up prices
        tokenPrice[GOLD] = price;
        tokenPrice[SILVER] = price / 2;
        tokenPrice[BRONZE] = price / 4;
        tokenPrice[IRON] = price / 8;
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    // This contract has 3 types of mint func
    // 1) owner (free) // 2) purchase >> (owner sets the price) // 3) allowList >> (1/2 of purchase)
    function mintPrivate(address _to, uint8 id, uint256 amount) private {
        require(id <= amountNFT, "You tryna get wrong nft");
        require(totalSupply(id) + amount <= tokenSupplyLimit[id], "Opps, minted out!");
        _mint(_to, id, amount, '');
    }

    function mintOwner(uint8 id, uint256 amount) public onlyOwner{
        mintPrivate(msg.sender, id, amount);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        whenNotPaused
        override(ERC1155, ERC1155Supply)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    // --------------------- ADDITIONAL FUNCTIONALITY ------------------------


    function setPrice(uint256 _price) internal onlyOwner{
        require(_price > 0, "Can not be 0");
        price = _price;
    }

    function getPrice()public view returns(uint256){
        return price;
    }

    function purchaseNFT(uint8 id, uint256 amount) public payable{
        require(msg.value >= tokenPrice[id] * amount, "Not enough funds! Pay up!");
        mintPrivate(msg.sender, id, amount);
    }

    function withdraw() external onlyOwner{
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

                //////// URL ////////////
    function uri(uint256 _id) public view override returns (string memory) {
        require(exists(_id), "URI: nonexistent token");

        return string(abi.encodePacked(super.uri(_id), Strings.toString(_id), ".json"));
    }



               /////// AllowList /////////
    bool public discountOpen = false;
    uint256 public dicountpice = price / 2;
    // create a map addr=>bool ---> who can get discount // and setter func

    function openDicount(bool _open) internal onlyOwner{
        discountOpen = _open; 
        // add funcs about time
    }

    function discountMint(uint8 id, uint256 amount) public payable{
        require(discountOpen, "No dicount yet!");
        require(msg.value >= dicountpice * amount, "Not enough funds! Pay up!");
 
         mintPrivate(msg.sender, id, amount);
    }


            //////// MAX AMOUNT OF EACH TOKEN EACH TOKEN /////////////

     mapping(uint8 => uint32) public tokenSupplyLimit;


    function setSupplyLimit(uint8 _tokenId, uint32 _supplyLimit) external onlyOwner{
        require(_supplyLimit > 0, "Can not be 0");
        require(_tokenId < amountNFT - 1, "Reach out of list");

        tokenSupplyLimit[_tokenId] = _supplyLimit;
    }
        
}