# Degen Token Game

![Avalanche](https://img.shields.io/badge/Avalanche-Fuji_Network-red.svg)
![Status](https://img.shields.io/badge/Website-Running-088395.svg)

In this Project i have implemented the ERC20 (Tokens) and ERC721URIStorage (NFTs) from open Zeppelin.

## There are two Contracts in this

- DegenTokenGame
- GameAsset

## Through this Project i tried to show the practical implementation of the Tokens and NFTs like

- How Tokens can be used to Buy/Redeem the NFTs.
- How Tokens can be transfered
- How Tokens can be minted (only by owner)

## Explanation of DegenTokenGame Contract

```Solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./gameAsset.sol";

contract DegenERC20 is ERC20 {
    modifier onlyOwner() {
        require(owner == msg.sender);
        _;
    }

    address private immutable owner;
    GameAsset immutable gameAsset;

    constructor(uint _tokenToMint) ERC20("Degen", "DGN") {
        owner = msg.sender;
        gameAsset = new GameAsset();
        _mint(msg.sender, _tokenToMint); // very small amount because it takes high gas fees
    }

    ///@notice to reward a certain user by _amount amount only callable by the owner.

    function mintTokenReward(
        address _address,
        uint _amount
    ) external onlyOwner {
        _mint(_address, _amount);
    }



    function checkingBalance() external view returns (uint) {
        return balanceOf(msg.sender);
    }



    function tranferTokens(address _recepient, uint _amount) external {
        require(balanceOf(msg.sender) >= _amount);
        transfer(_recepient, _amount);
    }

    ///@notice redeeming  token for a NFT
    function redeemTokens(string memory _URI, uint _NftPrice) external {
        require(balanceOf(msg.sender) >= _NftPrice);
        _transfer(msg.sender, address(this), _NftPrice);
        gameAsset.gameAssetMint(msg.sender, _URI);
    }

    function getMintedNFT() external view returns (string[] memory) {
        return gameAsset.returnMintedNFT(msg.sender);
    }

    ///@notice burn the _tokenAmount amount of token

    function burnToken(uint _tokenAmount) external {
        require(balanceOf(msg.sender) >= _tokenAmount);
        _burn(msg.sender, _tokenAmount);
    }

    ///@notice to withdraw all tokens
    function withdraw() external onlyOwner {
        _transfer(address(this), owner, balanceOf(address(this)));
    }

    function contractBalance() external view returns (uint) {
        return balanceOf(address(this));
    }

    ///@notice to receive wei/ethers from external sources like other account

    receive() external payable {}
}

```

### Constructor

- Its Initializing the Owner variable to the address of the deployer.
- Its make a new instance of GameAsset Contract and assigning it to gameAsset state variable.
- Its also minting some initial Token for the owner.

### MintTokenReward (onlyOwner)

I made this function such that to reward other accounts however i used is to mint for myself(owner) account.

- This function takes some amount as parameter and mints that amount of tokens (applicable only for owner)

### checkingBalance

- This function is used to check the token balance of the current user.

### transferTokens

- This function is used to transfer some amount of tokens to other account.

### getMintedNFT

- This function calls the `returnMintedNFT` of gameAsset contract which returns the URI of all the minted NFTs for the current account.(caller account)

### burnToken

- As the name suggest this function burns the \_amount of tokens from the current caller account

### withdraw and contractBalance

- These two are the functions which i didnt used but they are used to withdraw the tokens from the contract and check the token balance of the contract. (onlyOwner)

## GameAsset Contract

```Solidity

// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract GameAsset is ERC721URIStorage {
    uint256 private TokenCount;
    mapping(address => string[]) public mintedAssets;

    constructor() ERC721("GameAsset", "GAT") {}

    function gameAssetMint(address to, string memory _URI) public {
        _mint(to, TokenCount);
        _setTokenURI(TokenCount, _URI);
        mintedAssets[to].push(_URI);
        TokenCount++;
    }

    function returnMintedNFT(
        address _myAddress
    ) external view returns (string[] memory) {
        return mintedAssets[_myAddress];
    }
}
```

## gameAssetMint

- This function takes two arguments `to` as address and string `_URI` to mint the NFT to the `to` address.

## returnMintedNFT

- This function return the string of the minted URI of the current User.

Author : Kumar Devashish

## Website Design

## Initial Web Design (without Metamask connected)
![Screenshot_20240824_235958](https://github.com/user-attachments/assets/e30164fc-11e0-41a1-934b-2625fa73fea3)

## Initial Web Design (Metamask Connected)
![Screenshot_20240825_000318](https://github.com/user-attachments/assets/0f5276f6-5bce-44b4-a8d1-ff364f92b20b)

## Bought NFT UI
![Screenshot_20240825_000630](https://github.com/user-attachments/assets/e8ac3bbd-333c-43b3-acd5-61495cac4604)

## NFT MarketPlace
![Screenshot_20240825_000433](https://github.com/user-attachments/assets/809b32ec-c064-4f59-a422-e55a539e74a6)
