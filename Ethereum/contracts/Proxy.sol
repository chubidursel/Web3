// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Proxy {
    address public implementation;
    uint public num;

    address public implementation1;
    address public implementation2;

    constructor(address _imp1, address _imp2){
        implementation1 = _imp1;
        implementation2 = _imp2;
        implementation = _imp1;
    }

    function switchImplementation()external{
        if(implementation == implementation1){
            implementation = implementation2;
        } else {
            implementation = implementation1;
        }
    }

    function _delegate(address _implementation) internal virtual{
        assembly {
        //let ptr := mload(0x40)
        calldatacopy(0, 0, calldatasize()) // copy incoming call data
        let result := delegatecall(gas(), _implementation, 0, calldatasize(), 0, 0) // forward call to logic contract
        returndatacopy(0, 0, returndatasize()) // (3) retrieve return data
        //let size := returndatasize
        switch result // (4) forward return data back to caller
        case 0 {
             revert(0, returndatasize())
              }
        default { 
            return(0, returndatasize()) 
            }
        }
       
    }

    fallback() external payable{
        _delegate(implementation);
        
    }
    receive() external payable{}
}

contract BoxV1{
    address public implementation;
    uint public num;

    function inc() external {
        num++;
    }
    function dec() external {
        num--;
    }
// function for dev
    function encodeInc() external pure returns(bytes memory){
        return abi.encodeWithSelector(this.inc.selector);
    }
    function encodeDec() external pure returns(bytes memory){
        return abi.encodeWithSelector(this.dec.selector);
    }
    function encNum() external pure returns(bytes memory){
        return abi.encodeWithSelector(this.num.selector);
    }
}

contract BoxV2{
    address public implementation;
    uint public num;

    function inc() external {
       num = num + 5;
    }
    function dec() external {
        num = num - 5;
    }
}

