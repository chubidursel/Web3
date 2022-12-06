// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

/*
   ______  ______               ______     ______  
 .' ___  ||_   _ `.           .' ____ \  .' ___  | 
/ .'   \_|  | | `. \  ______  | (___ \_|/ .'   \_| 
| |         | |  | | |______|  _.____`. | |        
\ `.___.'\ _| |_.' /          | \____) |\ `.___.'\ 
 `.____ .'|______.'            \______.' `.____ .' 
   ChubiDuracell                 smart contract
*/

// !!!!!!!!!!!!!!!!!!!!!   TEMP  !!!!!!!!!!!!!!!!!!!!!
// 0x084f04362c2B72b34cf194296c3614861F7d8DF4 << V1

contract FlipCoinSimple{

    event Flip(address who, uint when, bool didWin, uint randomNum);

    struct UserInfo{
        uint bank;
        uint bet;
        bool wonLast;
        uint lost;
        uint gameCount;
    }

    mapping(address => UserInfo) public userInfo;

    address owner;

    IERC20 public token;


// There are few solution how to play with ERC20 tokens;
// 1. Straight > Front 2 tx (approve  then flip)
// 2. Make a valut in this sc, and then user can sign just 1 tx, and after he can withdraw the rest
// SIMPLE = play with ETH

    function flip() external {
        require(userInfo[msg.sender].bet <= userInfo[msg.sender].bank, "Someone lost all his tokens? Its just not ur day mate");
        require(userInfo[msg.sender].bank > 0, "Hey, you broke! lol");
        require(userInfo[msg.sender].bank < getBalance(), "You Won this game!");  

        uint _bet = userInfo[msg.sender].bet;

        userInfo[msg.sender].gameCount ++;

        userInfo[msg.sender].bank -= _bet;

        uint randomNum = _pseudoRandom(uint(uint160(msg.sender))) + block.timestamp;

        if((randomNum % 2) == 0){

            userInfo[msg.sender].bank += _bet * 2;

            userInfo[msg.sender].wonLast = true;
        } else {
            userInfo[msg.sender].lost ++;
        }

        emit Flip(msg.sender, block.timestamp, userInfo[msg.sender].wonLast, randomNum);
    }

// POOL
// player send tokens to this sc => 2 tx from Front (approve then transfer) => set up bet from front => starts playing => withdraw if player doesn want to continue
    function deposit(uint _bank, uint _bet) external {
        require(_bank <= getBalance(), "Unfortunately we are out of tokens here");
        require(_bank > 0 && _bet > 0, "Are u serious? Pay up!");
        require(_bank * 2 > _bet, "Your bank should be at least twice higer then one bet");

        // APPROVE FIRST
        token.transferFrom(msg.sender, address(this), _bank);

        userInfo[msg.sender].bet = _bet;

        userInfo[msg.sender].bank += _bank;
        
    }

    function withdrawPlayer()external{
        require(userInfo[msg.sender].bank > 0, "Are u scamer? You aint have shit here!");
        userInfo[msg.sender].bank = 0;
        token.transfer(msg.sender, checkUrBalance());
    }

    function checkUrBalance() public view returns(uint){
        return userInfo[msg.sender].bank;
    }

/////////////////////////////// DEV FUNC \\\\\\\\\\\\\\\\\\\\\\\\\\\
    modifier onlyOwner(){
      require(msg.sender == owner, "You are not an owner!");
      _;
    }

    constructor(IERC20 _token){
      owner = msg.sender;
      token = _token;
    } 

    function withdrawOwner()external onlyOwner{
        token.transfer(owner, address(this).balance); // unfair func
    }

    function getBalance() public view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function _pseudoRandom(uint _salt) private view returns(uint256 randomNum) {
      uint256 num = uint256(keccak256(abi.encodePacked(
        _salt,
        tx.origin, 
         blockhash(block.number - 1), 
        block.timestamp)));

      return num;
    }
}


interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);

    function balanceOf(address account) external view returns (uint256);

    function transferFrom(address from, address to, uint256 amount) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
}