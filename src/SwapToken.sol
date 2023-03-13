// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SwapToken {
    struct Wallet {
        address account;
        uint256 maxSwap;
        uint256 price;
    }
    // pay to
    address public immutable payee;
    // Token
    IERC20 public immutable TOKEN;
    // USDT
    IERC20 public immutable USDT;
    // Swap wallet address
    Wallet[6] public wallets;
    // Current wallet index
    uint8 public walletIndex;
    // Total Swap Tokens
    uint256 public totalSwapToken;
    // All accounts per wallet
    mapping(uint8 => address[]) public swapAccounts;
    // Amount of tokens exchanged per wallet
    mapping(uint8 => uint256) public swapToken;
    mapping(uint8 => mapping(address => uint256)) private _swapAccountToken;

    uint8 private unlocked = 1;
    modifier lock() {
        require(unlocked == 1, "LOCKED");
        unlocked = 0;
        _;
        unlocked = 1;
    }

    constructor(address _token, address _usdt) {
        TOKEN = IERC20(_token);
        USDT = IERC20(_usdt);
        payee = address(this);
    }

    // Initialize wallet information
    function initWallet(address[6] memory _wallet, uint256[6] memory _maxSwap, uint256[6] memory _price) external {
        require(wallets[0].account == address(0), "Wallet initialized.");
        for (uint256 i = 0; i < _wallet.length; i++) {
            wallets[i].account = _wallet[i];
            wallets[i].maxSwap = _maxSwap[i];
            wallets[i].price = _price[i];
        }
    }

    function getWalletAccout(uint8 _index) public view returns (address) {
        return wallets[_index].account;
    }

    function getWalletMaxSwap(uint8 _index) public view returns (uint256) {
        return wallets[_index].maxSwap;
    }

    function getWalletPrice(uint8 _index) public view returns (uint256) {
        return wallets[_index].price;
    }

    function getWalletSwapOf(uint8 _index, address _account) public view returns (uint256) {
        return _swapAccountToken[_index][_account];
    }

    // Calculate the number of convertible tokens
    function getTokenOut(uint8 _index, uint256 usdtIn) public view returns (uint256) {
        return ((usdtIn * 10 ** 18) / getWalletPrice(_index));
    }

    // Calculate the current wallet convertible balance
    function purchasableTokens(uint8 _index) public view returns (uint256) {
        return getWalletMaxSwap(_index) - swapToken[_index];
    }

    // Swap USDT to Token
    function swap(uint256 usdtIn) external lock {
        require(usdtIn > 0, "Cannot be zero.");
        // get new wallet index
        if (purchasableTokens(walletIndex) == 0) {
            require(walletIndex + 1 < 6, "Already the last one");
            walletIndex++;
        }
        // get swap token amount
        uint256 _tokenOut = getTokenOut(walletIndex, usdtIn);
        // get current wallet
        Wallet memory _wallet = wallets[walletIndex];
        // verify and check
        require(_wallet.account != address(0), "The wallet should be initialized.");
        require(purchasableTokens(walletIndex) >= _tokenOut, "Insufficient tokens available for purchase.");
        require(TOKEN.balanceOf(_wallet.account) >= _tokenOut, "Insufficient contract balance.");
        require(TOKEN.allowance(_wallet.account, address(this)) >= _tokenOut, "Insufficient contract allowance.");
        // pay usdt to payee
        USDT.transferFrom(msg.sender, payee, usdtIn);
        // update contract status
        if (_swapAccountToken[walletIndex][msg.sender] == 0) {
            swapAccounts[walletIndex].push(msg.sender);
        }
        totalSwapToken += _tokenOut;
        swapToken[walletIndex] += _tokenOut;
        _swapAccountToken[walletIndex][msg.sender] += _tokenOut;
        // transfer token to buyer
        TOKEN.transferFrom(_wallet.account, msg.sender, _tokenOut);
        emit Swap(_wallet.account, msg.sender, usdtIn, _tokenOut);
    }

    event Swap(address wallet, address user, uint256 usdtIn, uint256 tokenOut);
}
