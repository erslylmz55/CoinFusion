// SPDX-License-Identifier: MIT
const { ethers, upgrades } = require('hardhat');

async function main() {
    // Hardhat Runtime Environment (HRE) kullanarak kontrat ve deploy işlemlerini yapıyoruz
    const [deployer] = await ethers.getSigners();
    
    console.log("Deploying contracts with the account:", deployer.address);

    // CoinFusion kontratının akıllı kontratının referansını alıyoruz
    const CoinFusion = await ethers.getContractFactory("CoinFusion");

    // Kontratı dağıtıyoruz
    console.log("Deploying CoinFusion...");
    const coinFusion = await CoinFusion.deploy();

    // Dağıtım işlemi tamamlanana kadar bekliyoruz
    await coinFusion.deployed();

    console.log("CoinFusion deployed to:", coinFusion.address);
}

// Hata yönetimi için main fonksiyonunu çağırıyoruz
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
