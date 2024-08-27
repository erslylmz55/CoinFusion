// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Interface for ERC-20 Token Standard
interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
}

// ERC-20 Token Implementation
contract CoinFusion {
    address public owner;
    uint256 public tokenCount;
    
    struct Token {
        string name;
        string symbol;
        uint256 totalSupply;
        mapping(address => uint256) balances;
        mapping(address => mapping(address => uint256)) allowances;
    }

    mapping(address => Token) public tokens;

    event TokenFused(address indexed user, string name, string symbol, uint256 totalSupply);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    function fuseTokens(
        string memory _name, 
        string memory _symbol, 
        address _token1, 
        address _token2, 
        uint256 _amount1, 
        uint256 _amount2
    ) public {
        require(IERC20(_token1).balanceOf(msg.sender) >= _amount1, "Insufficient balance for token1");
        require(IERC20(_token2).balanceOf(msg.sender) >= _amount2, "Insufficient balance for token2");

        // Transfer tokens to the contract
        require(IERC20(_token1).transferFrom(msg.sender, address(this), _amount1), "Token1 transfer failed");
        require(IERC20(_token2).transferFrom(msg.sender, address(this), _amount2), "Token2 transfer failed");

        // Create new token
        Token storage newToken = tokens[msg.sender];
        newToken.name = _name;
        newToken.symbol = _symbol;
        newToken.totalSupply = _amount1 + _amount2;

        // Assign new token to user
        newToken.balances[msg.sender] = newToken.totalSupply;

        emit TokenFused(msg.sender, _name, _symbol, newToken.totalSupply);
    }

    function balanceOf(address _user) public view returns (uint256) {
        return tokens[_user].balances[_user];
    }

    function approve(address _spender, uint256 _amount) public returns (bool) {
        tokens[msg.sender].allowances[msg.sender][_spender] = _amount;
        return true;
    }

    function transfer(address _recipient, uint256 _amount) public returns (bool) {
        require(tokens[msg.sender].balances[msg.sender] >= _amount, "Insufficient balance");
        tokens[msg.sender].balances[msg.sender] -= _amount;
        tokens[msg.sender].balances[_recipient] += _amount;
        return true;
    }

    function transferFrom(address _sender, address _recipient, uint256 _amount) public returns (bool) {
        require(tokens[_sender].balances[_sender] >= _amount, "Insufficient balance");
        require(tokens[_sender].allowances[_sender][msg.sender] >= _amount, "Allowance exceeded");

        tokens[_sender].balances[_sender] -= _amount;
        tokens[_sender].balances[_recipient] += _amount;
        tokens[_sender].allowances[_sender][msg.sender] -= _amount;
        return true;
    }

    function allowance(address _owner, address _spender) public view returns (uint256) {
        return tokens[_owner].allowances[_owner][_spender];
    }
}
