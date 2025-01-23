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