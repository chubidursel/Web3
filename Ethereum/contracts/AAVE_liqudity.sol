// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;


//  PoolAddressesProvider-Aave >> 0xc4dCB5126a3AfEd129BC3668Ea19285A9f56D15D

// 1) approve
//  100000000000000000000, 0xf37d4D1a1BaA44b31A6bdD5383A621d69e5407A6

// 2) supply
//  0x7337e7FF9abc45c0e43f130C136a072F4794d40b, 50000000000000000000

// remix example >> 0xf37d4D1a1BaA44b31A6bdD5383A621d69e5407A6


contract LiqudityAAVE {

    address payable owner;

    IPoolAddressesProvider public immutable ADDRESSES_PROVIDER;

    IPool public immutable POOL;

    address private immutable linkAddress = 0x7337e7FF9abc45c0e43f130C136a072F4794d40b;

    IERC20 private link;

    // add ETH address to supply to liqudity 

    constructor(address _addressProvider) {
        ADDRESSES_PROVIDER = IPoolAddressesProvider(_addressProvider);
        POOL = IPool(ADDRESSES_PROVIDER.getPool());
        owner = payable(msg.sender);
        link = IERC20(linkAddress);
    }

    function supplyLiquidity(address _tokenAddress, uint256 _amount) external {
        address asset = _tokenAddress;
        uint256 amount = _amount;
        address onBehalfOf = address(this);
        uint16 referralCode = 0;

        POOL.supply(asset, amount, onBehalfOf, referralCode);
    }

    function withdrawlLiquidity(address _tokenAddress, uint256 _amount)
        external
        returns (uint256)
    {
        address asset = _tokenAddress;
        uint256 amount = _amount;
        address to = address(this);

        return POOL.withdraw(asset, amount, to);
    }

    function getUserAccountData(address _userAddress)
        external
        view
        returns (
            uint256 totalCollateralBase,
            uint256 totalDebtBase,
            uint256 availableBorrowsBase,
            uint256 currentLiquidationThreshold,
            uint256 ltv,
            uint256 healthFactor
        )
    {
        return POOL.getUserAccountData(_userAddress);
    }

    function approveLINK(uint256 _amount, address _poolContractAddress)
        external
        returns (bool)
    {
        return link.approve(_poolContractAddress, _amount);
    }

// Change this! Dont need to toss address as param
    function allowanceLINK(address _poolContractAddress)
        external
        view
        returns (uint256)
    {
        return link.allowance(address(this), _poolContractAddress);
    }

// ADD func to check out aLink balance
    function getBalance() external view returns (uint256) {
        return IERC20(linkAddress).balanceOf(address(this));
    }

    function withdraw(address _tokenAddress) external onlyOwner {
        IERC20 token = IERC20(_tokenAddress);
        token.transfer(msg.sender, token.balanceOf(address(this)));
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not an owner!"
        );
        _;
    }

    receive() external payable {}
}