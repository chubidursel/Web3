// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

//burnable??
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

// https://gateway.pinata.cloud/ipfs/QmNM3ZUzASR78M61PsPF3f63j13ZsXNCACnfMshNroFuKz

contract NftTest is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

// INSTEAD using URL storage
    // string _baseTokenURI;
    // function setBaseURI(string memory uri) public{
    //     _baseTokenURI = uri;
    // }
  //  `ipfs://QmbzXf4jGd5Hwvk6PwLgbKZnKQ8AWMcCvjazKi4qdJ7RXM`

    mapping(string=>uint8) existingURIs;

    constructor() ERC721("NftTest", "NT") {}

    function _baseURI() internal pure override returns (string memory) {
        return "QmNM3ZUzASR78M61PsPF3f63j13ZsXNCACnfMshNroFuKz"; //+id +.json 
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
//from FireShip
      function isContentOwned(string memory uri) public view returns (bool) {
        return existingURIs[uri] == 1;
    }

    function payToMint(
        address recipient,
        string memory metadataURI
    ) public payable returns (uint256) {

        require(existingURIs[metadataURI] != 1, 'NFT already minted!');
        require (msg.value >= 0.05 ether, 'Need to pay up!');

        uint256 newItemId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        existingURIs[metadataURI] = 1;

        _mint(recipient, newItemId);
        _setTokenURI(newItemId, metadataURI);

        return newItemId;
    }

    function count() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

}

// 0x63018F44E822875Be96e7CE6F5b53cB1dEcA1B96 1st
// 0x98162D17D4d15c945B7418475EdEb4d9c0335684 2nd