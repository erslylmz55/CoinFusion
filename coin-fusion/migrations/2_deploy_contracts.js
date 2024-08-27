// SPDX-License-Identifier: MIT
const { ethers } = require('hardhat');

async function main() {
    // Hardhat Runtime Environment (HRE) kullanarak kontrat ve deploy işlemlerini yapıyoruz
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // CoinFusion kontratının fabrika referansını alıyoruz
    const CoinFusion = await ethers.getContractFactory("CoinFusion");

    // Kontratı dağıtıyoruz
    console.log("Deploying CoinFusion...");
    const coinFusion = await CoinFusion.deploy();

    // Dağıtım işlemi tamamlanana kadar bekliyoruz
    await coinFusion.deployed();

    console.log("CoinFusion deployed to:", coinFusion.address);

    // Kontratın adresini ağda saklamak veya testler için kullanmak üzere bir yerde saklayabilirsiniz
    // Örneğin, bir JSON dosyasına yazabilirsiniz (Opsiyonel)
    const fs = require('fs');
    const path = require('path');

    const contractsDir = path.join(__dirname, '../frontend/src/contracts');
    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir, { recursive: true });
    }

    const contractData = {
        CoinFusion: {
            address: coinFusion.address,
        },
    };

    fs.writeFileSync(
        path.join(contractsDir, 'contract-address.json'),
        JSON.stringify(contractData, null, 2)
    );
}

// Hata yönetimi için main fonksiyonunu çağırıyoruz
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
