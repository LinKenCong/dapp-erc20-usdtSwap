// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestToken is ERC20("TestToken", "TestToken") {
    constructor() {
        _mint(_msgSender(), 1000000000 * 10 ** decimals());
    }
}
