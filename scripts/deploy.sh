#!/bin/bash

if [ "$#" -ne 1 ]; then
    echo "Usage: ./deploy.sh <PRIVATE_KEY>"
    exit 1
fi

PRIVATE_KEY=$1

# Ensure Foundry is installed
if ! command -v forge &> /dev/null; then
    echo "Foundry (forge) not found. Installing..."
    curl -L https://foundry.paradigm.xyz | bash
    source ~/.bashrc
    foundryup
fi

# Create a new Foundry project
mkdir -p IBT && cd IBT
forge init

# Create Solidity contract
cat > src/IBT.sol <<EOL
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract IBT {
    string public name = "IBT";
    string public symbol = "IBT";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    address public owner;
    mapping(address => uint256) public balanceOf;

    constructor() {
        owner = msg.sender;
    }

    function mint(address _to, uint256 _amount) external {
        require(msg.sender == owner);
        totalSupply += _amount;
        balanceOf[_to] += _amount;
    }

    function burn(address _from, uint256 _amount) external {
        require(msg.sender == owner);
        require(balanceOf[_from] >= _amount);
        balanceOf[_from] -= _amount;
        totalSupply -= _amount;
    }

    function transfer(address _to, uint256 _amount) external returns (bool) {
        require(balanceOf[msg.sender] >= _amount);
        balanceOf[msg.sender] -= _amount;
        balanceOf[_to] += _amount;
        return true;
    }
}
EOL

# Compile contract
forge build

# Deploy contract
forge create --rpc-url http://127.0.0.1:8545/ --private-key $PRIVATE_KEY src/IBT.sol:IBT
