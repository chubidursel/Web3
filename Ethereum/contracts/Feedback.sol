// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;


// GIVE NFT FOR THE FEEDBACK!!!!

contract Feedback {
    event FeedBack(address who, string feedBack, uint time);

    uint public feebackAmount = 1;

    mapping (address => string[]) public listFeedback;

    function leaveFeedback(string calldata _feedback) external {  
        listFeedback[msg.sender].push(_feedback);
        feebackAmount ++;
        emit FeedBack(msg.sender, _feedback, block.timestamp);
    }

}