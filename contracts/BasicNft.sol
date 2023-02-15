// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import 'hardhat/console.sol';
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BasicNft is ERC721 {
    address private owner;
    uint256 public tokenId;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        owner = msg.sender;
        tokenId = 1;
    }

    function mintNFTtoken() public {        
        _safeMint(msg.sender, tokenId);
        // console.log('tokenId: ', tokenId);
        // console.log('ownerOf(_tokenId): inside NFT', ownerOf(tokenId));
        tokenId++;
    }

    // function giveApproval(address _to, uint256 _tokenId) public {
    //     require(msg.sender == ownerOf(_tokenId), "You are not the owner of this token");
    //     approve(_to, _tokenId);
    // }
    
}