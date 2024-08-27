async function updateProfile(account) {
    document.getElementById('userAddress').innerText = `Wallet Address: ${account}`;
    
    const nftContract = new ethers.Contract(nftContractAddress, nftAbi, provider);
    const balance = await nftContract.balanceOf(account);
    document.getElementById('nftCount').innerText = `Owned NFTs: ${balance.toString()}`;
}

async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            updateProfile(account);
        } catch (error) {
            console.error("User denied account access", error);
        }
    } else {
        alert("Metamask is not installed. Please install it to use this app.");
    }
}

window.onload = connectWallet;
