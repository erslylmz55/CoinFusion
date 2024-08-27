// Genel uygulama işlevleri ve cüzdan bağlantısı fonksiyonlarını içerir

// Ethers.js sağlayıcısı
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// NFT Fusion işlemi
const nftFusionAddress = 'YOUR_CONTRACT_ADDRESS';
const nftFusionAbi = [
    // ABI detaylarını buraya ekleyin
];

const nftFusionContract = new ethers.Contract(nftFusionAddress, nftFusionAbi, signer);

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

// Cüzdan bağlantısı fonksiyonu
async function connectWallet() {
    try {
        await provider.send("eth_requestAccounts", []);
        const account = await signer.getAddress();
        document.getElementById('walletAddress').innerText = `Connected: ${account}`;
        console.log("Wallet connected:", account);
    } catch (error) {
        console.error("Error connecting wallet:", error);
        document.getElementById('walletAddress').innerText = "Failed to connect wallet. Check the console for details.";
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
