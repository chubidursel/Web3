// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;


import "../../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "../../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../../node_modules/@openzeppelin/contracts/utils/Strings.sol";

contract Emoji is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;

    string public folderNftUri = "QmNM3ZUzASR78M61PsPF3f63j13ZsXNCACnfMshNroFuKz";

    Counters.Counter private _tokenIdCounter;

    //mapping(string=>bool) existingURIs;

    constructor() ERC721("EmojiNft", "EMJ") {
        _tokenIdCounter.increment();
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://QmNM3ZUzASR78M61PsPF3f63j13ZsXNCACnfMshNroFuKz/";  
    }

    function safeMint(address to) public onlyOwner {
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

//from FireShip
    function payToMint() public payable returns (uint256) {
        require (msg.value >= Rate, "Need to pay up!");

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI(tokenId));

        return tokenId;
    }
//MY FUNC
    function numOfNft()public view returns (uint num){
        return _tokenIdCounter.current() -1;
    }

    uint public Rate = 0.05 ether;

    function setRate(uint _num) external onlyOwner{
        Rate = _num;
    }

    function getBalanceEth()public view returns(uint total){
        return address(this).balance;
    }
    function withdrow() external onlyOwner{
        address payable _to = payable(msg.sender);
        _to.transfer(getBalanceEth());
    }
}
