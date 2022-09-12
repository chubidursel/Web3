// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";

// Decrease the rate, its tooo expensive


contract Exchange {
    event Purchase(address indexed buyer, uint amount);
    event Sold(address indexed seller, uint amount);

    IERC20 public immutable token;
    address owner;
    address exchange = address(this);
    
    constructor(address _token){
        token = IERC20(_token);
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "You are not an owner =(");
        _;
    }

    function getEthBalance() public view returns(uint){
        return address(this).balance;
    }
    function getTokenBalance() public view returns(uint){
        return token.balanceOf(exchange);
    }

    function buyToken() public payable{
        require(msg.value >= 0.1 ether, "Pay up");
        uint tokenAvalible = getTokenBalance();
        uint tokenRate = msg.value / 1 ether; // 1 eth = 1 CWT

        require(tokenRate <= tokenAvalible, "Not enough tokens");

        token.transfer(msg.sender, tokenRate);
        emit Purchase(msg.sender, tokenRate);
    }

    function sellToken(uint _amount) external{
        require(_amount > 0, "Amount must be grater than 0");
        uint allowance = token.allowance(msg.sender, exchange);
        require(allowance >= _amount, "Wrong allowance");
        token.transferFrom(msg.sender, exchange, _amount);
        payable(msg.sender).transfer(_amount * 1 ether);
        emit Sold(msg.sender, _amount);
    }

    function withdraw(uint amount) external onlyOwner{
        require(amount <= getEthBalance(), "Not enough funds");
        payable(msg.sender).transfer(amount);
    }
}