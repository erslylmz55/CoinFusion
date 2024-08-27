// SPDX-License-Identifier: MIT

// Ethers.js kütüphanesini içe aktarın
const { ethers } = require('ethers');

// Kontratın ABI ve adres bilgilerini yükleyin
const contractABI = [
    // Kontratın ABI'sini buraya ekleyin
    "function fuseTokens(string memory _name, string memory _symbol, address _token1, address _token2, uint256 _amount1, uint256 _amount2) public",
    "function balanceOf(address _user) public view returns (uint256)"
];

const contractAddress = "0xYourContractAddress"; // Kontratın dağıtım adresini buraya ekleyin

// Ethereum sağlayıcısı ve kontrat ile etkileşim kurmak için bir sağlayıcı oluşturun
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const coinFusionContract = new ethers.Contract(contractAddress, contractABI, signer);

// DOM ile etkileşim
document.getElementById('fuseButton').addEventListener('click', async () => {
    const name = document.getElementById('nameInput').value;
    const symbol = document.getElementById('symbolInput').value;
    const token1 = document.getElementById('token1Input').value;
    const token2 = document.getElementById('token2Input').value;
    const amount1 = ethers.utils.parseUnits(document.getElementById('amount1Input').value, 18);
    const amount2 = ethers.utils.parseUnits(document.getElementById('amount2Input').value, 18);

    try {
        const tx = await coinFusionContract.fuseTokens(name, symbol, token1, token2, amount1, amount2);
        await tx.wait();
        alert('Tokens fused successfully!');
    } catch (error) {
        console.error(error);
        alert('An error occurred while fusing tokens.');
    }
});

document.getElementById('balanceButton').addEventListener('click', async () => {
    const userAddress = document.getElementById('addressInput').value;

    try {
        const balance = await coinFusionContract.balanceOf(userAddress);
        document.getElementById('balanceOutput').innerText = `Balance: ${ethers.utils.formatUnits(balance, 18)}`;
    } catch (error) {
        console.error(error);
        alert('An error occurred while fetching the balance.');
    }
});

async function fuseNFTs() {
    const nftContract1 = document.getElementById("nftContract1").value;
    const tokenId1 = document.getElementById("tokenId1").value;
    const nftContract2 = document.getElementById("nftContract2").value;
    const tokenId2 = document.getElementById("tokenId2").value;
    const newTokenURI = document.getElementById("newTokenURI").value;

    const nftFusionContract = new ethers.Contract(nftFusionAddress, nftFusionAbi, signer);
    const tx = await nftFusionContract.fuseNFTs(nftContract1, tokenId1, nftContract2, tokenId2, newTokenURI);
    await tx.wait();

    console.log("New fused NFT created with token ID:", tx.events[0].args.newTokenId.toNumber());
}

// Kullanıcı cüzdanını bağlama fonksiyonu
async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Cüzdanı bağlamak için istek gönder
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            
            // Bağlantı başarılı olursa cüzdan adresini göster
            document.getElementById('walletAddress').innerText = `Wallet Address: ${account}`;
            
            // Profil sayfası için profil güncelleme fonksiyonunu çağır
            updateProfile(account);
        } catch (error) {
            console.error("User denied account access", error);
            document.getElementById('walletAddress').innerText = "Error: Could not connect wallet.";
        }
    } else {
        // Web3 sağlayıcısı mevcut değilse kullanıcıya bilgi ver
        alert("MetaMask is not installed. Please install MetaMask to use this app.");
    }
}

// Kullanıcı profilini güncelleme fonksiyonu
async function updateProfile(account) {
    document.getElementById('userAddress').innerText = `Wallet Address: ${account}`;
    
    // NFT kontratından kullanıcıya ait NFT sayısını al
    const nftContract = new ethers.Contract(nftContractAddress, nftAbi, provider);
    const balance = await nftContract.balanceOf(account);
    document.getElementById('nftCount').innerText = `Owned NFTs: ${balance.toString()}`;
}

// Sayfa yüklendiğinde hangi fonksiyonların çalışacağını belirleme
window.onload = function() {
    const page = document.body.getAttribute('data-page');
    
    if (page === 'connect_wallet') {
        document.getElementById('connectWalletButton').addEventListener('click', connectWallet);
    } else if (page === 'profile') {
        connectWallet();
    }
};

// Akıllı kontrat adresi ve ABI
const nftFusionAddress = 'YOUR_CONTRACT_ADDRESS';
const nftFusionAbi = [
    // ABI detaylarını buraya ekleyin
];

// Ethers.js sağlayıcısı
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const nftFusionContract = new ethers.Contract(nftFusionAddress, nftFusionAbi, signer);

// NFT'leri birleştirme fonksiyonu
async function fuseNFTs(tokenIds) {
    try {
        const tx = await nftFusionContract.fuseNFTs(tokenIds);
        await tx.wait();
        alert("NFTs fused successfully!");
    } catch (error) {
        console.error("Error fusing NFTs:", error);
        alert("Failed to fuse NFTs. Check the console for details.");
    }
}

// Sayfa yüklendiğinde gerekli event listener'ları ekle
window.onload = function() {
    const fuseButton = document.getElementById('fuseButton');
    if (fuseButton) {
        fuseButton.addEventListener('click', async () => {
            const tokenIds = JSON.parse(document.getElementById('nftTokenIds').value);
            await fuseNFTs(tokenIds);
        });
    }
};

// Akıllı kontrat adresi ve ABI
const nftFusionAddress = 'YOUR_CONTRACT_ADDRESS';
const nftFusionAbi = [
    // ABI detaylarını buraya ekleyin
];

// Ethers.js sağlayıcısı
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const nftFusionContract = new ethers.Contract(nftFusionAddress, nftFusionAbi, signer);

async function connectWallet() {
    try {
        // Kullanıcıdan cüzdan bağlantısı iste
        await provider.send("eth_requestAccounts", []);
        const account = await signer.getAddress();
        document.getElementById('walletAddress').innerText = `Connected: ${account}`;
        console.log("Wallet connected:", account);
    } catch (error) {
        console.error("Error connecting wallet:", error);
        document.getElementById('walletAddress').innerText = "Failed to connect wallet. Check the console for details.";
    }
}

async function fuseNFTs(tokenIds) {
    try {
        const tx = await nftFusionContract.fuseNFTs(tokenIds);
        await tx.wait();
        document.getElementById('fusionResult').innerText = "NFTs fused successfully!";
    } catch (error) {
        console.error("Error fusing NFTs:", error);
        document.getElementById('fusionResult').innerText = "Failed to fuse NFTs. Check the console for details.";
    }
}

window.onload = function() {
    const page = document.body.getAttribute('data-page');
    
    if (page === 'nft_fusion') {
        const fuseButton = document.getElementById('fuseButton');
        if (fuseButton) {
            fuseButton.addEventListener('click', async () => {
                const tokenIdsInput = document.getElementById('nftTokenIds').value;
                const tokenIds = tokenIdsInput.split(',').map(id => id.trim()).filter(id => id.length > 0);
                if (tokenIds.length > 0) {
                    await fuseNFTs(tokenIds);
                } else {
                    document.getElementById('fusionResult').innerText = "Please enter valid Token IDs.";
                }
            });
        }
    }

    if (page === 'connect_wallet') {
        const connectButton = document.getElementById('connectWalletButton');
        if (connectButton) {
            connectButton.addEventListener('click', async () => {
                await connectWallet();
            });
        }
    }
};
// Ethers.js sağlayıcısı ve signer'ı tanımla
let provider;
let signer;

// Cüzdan bağlantısını sağlama fonksiyonu
async function connectWallet() {
    try {
        // MetaMask'ın sağladığı sağlayıcıyı kullanarak bağlantı iste
        if (window.ethereum) {
            provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            signer = provider.getSigner();
            const account = await signer.getAddress();
            document.getElementById('walletAddress').innerText = `Connected: ${account}`;
            console.log("Wallet connected:", account);
        } else {
            console.error("MetaMask is not installed.");
            document.getElementById('walletAddress').innerText = "MetaMask is not installed.";
        }
    } catch (error) {
        console.error("Error connecting wallet:", error);
        document.getElementById('walletAddress').innerText = "Failed to connect wallet. Check the console for details.";
    }
}

// NFT Fusion işlemi
const nftFusionAddress = 'YOUR_CONTRACT_ADDRESS'; // Kontrat adresinizi buraya ekleyin
const nftFusionAbi = [
    // ABI detaylarını buraya ekleyin
];

let nftFusionContract;

async function setupContract() {
    if (signer) {
        nftFusionContract = new ethers.Contract(nftFusionAddress, nftFusionAbi, signer);
    } else {
        console.error("Wallet not connected. Please connect your wallet first.");
    }
}

async function fuseNFTs(tokenIds) {
    try {
        if (!nftFusionContract) {
            await setupContract();
        }
        const tx = await nftFusionContract.fuseNFTs(tokenIds);
        await tx.wait();
        document.getElementById('fusionResult').innerText = "NFTs fused successfully!";
    } catch (error) {
        console.error("Error fusing NFTs:", error);
        document.getElementById('fusionResult').innerText = "Failed to fuse NFTs. Check the console for details.";
    }
}

// Sayfa yüklendiğinde gerekli event listener'ları ekle
window.onload = function() {
    const page = document.body.getAttribute('data-page');
    
    if (page === 'nft_fusion') {
        const fuseButton = document.getElementById('fuseButton');
        if (fuseButton) {
            fuseButton.addEventListener('click', async () => {
                const tokenIdsInput = document.getElementById('nftTokenIds').value;
                const tokenIds = tokenIdsInput.split(',').map(id => id.trim()).filter(id => id.length > 0);
                if (tokenIds.length > 0) {
                    await fuseNFTs(tokenIds);
                } else {
                    document.getElementById('fusionResult').innerText = "Please enter valid Token IDs.";
                }
            });
        }
    }

    if (page === 'connect_wallet') {
        const connectButton = document.getElementById('connectWalletButton');
        if (connectButton) {
            connectButton.addEventListener('click', async () => {
                await connectWallet();
            });
        }
    }
};

