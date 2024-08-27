// SPDX-License-Identifier: MIT
const { ethers, network } = require("hardhat");

async function main() {
    // Hardhat Runtime Environment (HRE) kullanarak deploy işlemlerini yapıyoruz
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // Kontratın fabrika referansını alıyoruz
    const CoinFusion = await ethers.getContractFactory("CoinFusion");

    console.log("Deploying CoinFusion...");

    // Kontratı dağıtıyoruz
    const coinFusion = await CoinFusion.deploy();

    // Dağıtım işlemi tamamlanana kadar bekliyoruz
    await coinFusion.deployed();

    console.log("CoinFusion deployed to:", coinFusion.address);

    // Dağıtım işlemi ile ilgili bilgi mesajları
    console.log(`Network: ${network.name}`);
    console.log(`Contract Address: ${coinFusion.address}`);
    console.log(`Transaction Hash: ${coinFusion.deployTransaction.hash}`);
}

// Hata yönetimi için main fonksiyonunu çağırıyoruz
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
