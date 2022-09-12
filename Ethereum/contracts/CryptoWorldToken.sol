// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract CryptoWorldToken is ERC20, ERC20Burnable, Ownable {
    constructor() ERC20("CryptoWorldToken", "CWT") {
        _mint(msg.sender, 10000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}

// npx hardhat clean && npx hardhat compile