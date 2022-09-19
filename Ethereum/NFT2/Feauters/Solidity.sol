// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
contract NftTest{

        // pseudo random from > https://etherscan.io/address/0x02beed1404c69e62b76af6dbdae41bd98bca2eab#code
    function random(address minter) public view returns (uint) {
        return uint(
            keccak256(
                abi.encodePacked(
                    blockhash(block.number - 1),
                    totalSupply(),
                    minter
                )
            )
        );
    }

    //CONTAT string //https://etherscan.io/address/0x34d85c9cdeb23fa97cb08333b511ac86e1c4e258#code
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString())) : "";
    }


    // INSTEAD using URL storage
    string _baseTokenURI;
    function setBaseURI(string memory uri) public{
        _baseTokenURI = uri;
    }
   //   'ipfs://QmbzXf4jGd5Hwvk6PwLgbKZnKQ8AWMcCvjazKi4qdJ7RXM`



}