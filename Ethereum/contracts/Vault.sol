// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./IERC20.sol";

// try add some function from here ->
// https://github.com/JoshWeb3/eth-to-am3crv-vault-strategy


// DEPOSIT CWT here >> exchange them >> toss into luqidity pool || where wrtite all this funcs? / PROXY?

contract Vault {
    event Lock(address from, uint amount, uint time);
    event Withdraw(address to, uint amount, uint time);

    IERC20 public immutable token;

    uint public totalSupply;
    
    mapping(address => uint) public balanceOf;

    constructor(address _token) {
        token = IERC20(_token);
    }

    function _mint(address _to, uint _shares) private {
        totalSupply += _shares;
        balanceOf[_to] += _shares;
    }

    function _burn(address _from, uint _shares) private {
        totalSupply -= _shares;
        balanceOf[_from] -= _shares;
    }

    function deposit(uint _amount) external {
        uint shares;
        if (totalSupply == 0) {
            shares = _amount;
        } else {
            shares = (_amount * totalSupply) / token.balanceOf(address(this));
        }

        _mint(msg.sender, shares);
        token.transferFrom(msg.sender, address(this), _amount);

        emit Lock(msg.sender, _amount, block.timestamp);
    }

    function withdraw(uint _shares) external {
        uint amount = (_shares * token.balanceOf(address(this))) / totalSupply;
        _burn(msg.sender, _shares);
        token.transfer(msg.sender, amount);

        emit Withdraw(msg.sender, _shares, block.timestamp);
    }
}