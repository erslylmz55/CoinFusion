// nft-fusion.js

// Örnek veriler, bunları yerine gerçek API çağrıları ekleyebilirsiniz
const nfts = [
    { id: 1, traits: { color: "blue", eyes: "red" } },
    { id: 2, traits: { color: "green", eyes: "blue" } },
    { id: 3, traits: { color: "blue", eyes: "green" } },
    { id: 4, traits: { color: "green", eyes: "red" } }
];

function calculateRarity(nfts) {
    const traitCounts = {};
    nfts.forEach(nft => {
        Object.keys(nft.traits).forEach(trait => {
            const traitValue = nft.traits[trait];
            if (!traitCounts[trait]) traitCounts[trait] = {};
            if (!traitCounts[trait][traitValue]) traitCounts[trait][traitValue] = 0;
            traitCounts[trait][traitValue]++;
        });
    });

    nfts.forEach(nft => {
        let rarityScore = 0;
        Object.keys(nft.traits).forEach(trait => {
            const traitValue = nft.traits[trait];
            const rarity = (traitCounts[trait][traitValue] / nfts.length) * 100;
            rarityScore += (1 / rarity);
        });
        nft.rarityScore = rarityScore;
    });

    return nfts;
}

function displayNFTs(nfts) {
    const nftContainer = document.getElementById('nft-container');
    nfts.forEach(nft => {
        const nftElement = document.createElement('div');
        nftElement.className = 'nft-item';
        nftElement.innerHTML = `
            <h3>NFT #${nft.id}</h3>
            <p>Color: ${nft.traits.color}</p>
            <p>Eyes: ${nft.traits.eyes}</p>
            <p>Rarity Score: ${nft.rarityScore.toFixed(2)}</p>
        `;
        nftContainer.appendChild(nftElement);
    });
}

const nftsWithRarity = calculateRarity(nfts);
displayNFTs(nftsWithRarity);
