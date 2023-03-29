// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract SwapToken {
    using SafeMath for uint256;

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
    Wallet[] public wallets;
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

    constructor(
        address _token,
        address _usdt,
        address _payee,
        address[6] memory _wallets,
        uint256[6] memory _maxSwap,
        uint256[6] memory _price
    ) {
        TOKEN = IERC20(_token);
        USDT = IERC20(_usdt);
        payee = _payee;

        for (uint256 i = 0; i < _wallets.length; i++) {
            require(_wallets[i] != address(0), "Wallet address cannot be zero");
            wallets.push(Wallet({account: _wallets[i], maxSwap: _maxSwap[i], price: _price[i]}));
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
        uint256 price = wallets[_index].price;
        require(price > 0, "Wallet price cannot be zero");
        return usdtIn.mul(10 ** 18).div(price);
    }

    // Calculate the current wallet convertible balance
    function purchasableTokens(uint8 _index) public view returns (uint256) {
        uint256 maxSwap = wallets[_index].maxSwap;
        require(maxSwap > 0, "Wallet maxSwap cannot be zero");
        uint256 swapped = swapToken[_index];
        if (swapped >= maxSwap) {
            return 0;
        }
        return maxSwap.sub(swapped);
    }

    // Swap USDT to Token
    function swap(uint256 usdtIn) external lock {
        require(msg.sender != address(0), "Sender address cannot be zero");
        require(USDT.balanceOf(msg.sender) >= usdtIn, "Insufficient usdt balance");
        require(usdtIn > 0, "Cannot be zero.");
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
        // get new wallet index
        uint256 _purchasable = purchasableTokens(walletIndex);
        require(_purchasable == 0 || _purchasable >= _wallet.price, "Surplus cannot be less than price.");
        if (_purchasable == 0 && walletIndex < wallets.length) {
            walletIndex++;
        }
        // transfer token to buyer
        TOKEN.transferFrom(_wallet.account, msg.sender, _tokenOut);
        emit Swap(_wallet.account, msg.sender, usdtIn, _tokenOut);
    }

    event Swap(address wallet, address user, uint256 usdtIn, uint256 tokenOut);
}
