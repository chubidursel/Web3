// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CircleArt is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {

    using Counters for Counters.Counter;
    using Strings for uint256;

    uint8 public maxSupply = 33;
    uint8 public maxPerWallet = 3;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("CircleArt", "CA") {
        _tokenIdCounter.increment();
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://QmXJ3DPJ5upfYMtJCS4yttqbbhYaJprHFXoLZNF3kqth3Z/";  
    }


    function safeMint(address to) public onlyOwner {
        require(_tokenIdCounter.current() <= maxSupply, "Opps, all NFT has been minted");

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI(tokenId));
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory){
        require(_exists(tokenId), "ERC721Metadata: URI query for non-existent token");
        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json")) : "";
    }

//BUY!
    function purchase() public payable returns (uint256) {
        require (msg.value >= Rate, "Need to pay up!");
         require(balanceOf(msg.sender) <= maxPerWallet, "This purchase would exceed maximum allocation for public mints for this wallet");

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI(tokenId));

        return tokenId;
    }

    function amountMintedNFT()public view returns (uint num){
        return _tokenIdCounter.current() -1;
    }

    uint public Rate = 0.01 ether;

    function setRate(uint _num) external onlyOwner{
        Rate = _num;
    }

    function getBalanceEth()public view returns(uint total){
        return address(this).balance;
    }
    function withdraw() external onlyOwner{
        address payable _to = payable(msg.sender);
        _to.transfer(getBalanceEth());
    }

    //WHITELIST??
    //ADD MORE FEAURES
}
