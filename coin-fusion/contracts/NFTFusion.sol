// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTFusion is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    constructor() ERC721("FusedNFT", "FNFT") {
        tokenCounter = 0;
    }

    function fuseNFTs(
        address nftContract1,
        uint256 tokenId1,
        address nftContract2,
        uint256 tokenId2,
        string memory newTokenURI
    ) public returns (uint256) {
        // Transfer the NFTs to this contract
        IERC721(nftContract1).transferFrom(msg.sender, address(this), tokenId1);
        IERC721(nftContract2).transferFrom(msg.sender, address(this), tokenId2);

        // Mint a new NFT as the fusion of the two NFTs
        uint256 newTokenId = tokenCounter;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, newTokenURI);

        tokenCounter += 1;
        return newTokenId;
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract NFTFusion is ERC721, ERC721Burnable {
    uint256 public nextTokenId;
    mapping(uint256 => uint256[]) public fusedNFTs; // Token ID ile ilişkilendirilmiş NFT'ler

    constructor() ERC721("NFT Fusion", "NFTF") {}

    // Yeni NFT oluşturma
    function mint(address to) external returns (uint256) {
        uint256 tokenId = nextTokenId;
        _mint(to, tokenId);
        nextTokenId++;
        return tokenId;
    }

    // NFT'leri birleştirme
    function fuseNFTs(uint256[] memory tokenIds) external returns (uint256) {
        require(tokenIds.length > 1, "At least two NFTs required");
        
        for (uint256 i = 0; i < tokenIds.length; i++) {
            require(ownerOf(tokenIds[i]) == msg.sender, "Not owner of all NFTs");
            _burn(tokenIds[i]); // Orijinal NFT'leri yak
        }
        
        uint256 newTokenId = mint(msg.sender);
        fusedNFTs[newTokenId] = tokenIds; // Yeni NFT ile ilişkilendirilmiş eski NFT'ler
        return newTokenId;
    }
}
