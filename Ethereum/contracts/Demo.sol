// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Demo {
    uint num;
    address public owner;

    event SetNumber(address who, uint number, uint time);

    constructor(){
        owner = msg.sender;
    }
    modifier onlyOwner(){
        require(msg.sender == owner, "You are not an owner!");
        _;
    }

    function setNum(uint _num) public onlyOwner{
        num = _num;
        emit SetNumber(msg.sender, _num, block.timestamp);
    }

    function getNumber()public view returns(uint){
        return num;
    }
}
