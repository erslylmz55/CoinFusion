// SPDX-License-Identifier: MIT
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CoinFusion", function () {
    let CoinFusion;
    let coinFusion;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        // Kontratın ve hesapların setup'ını yapıyoruz
        [owner, addr1, addr2] = await ethers.getSigners();

        // CoinFusion kontratının fabrikasını alıyoruz
        CoinFusion = await ethers.getContractFactory("CoinFusion");
        
        // Kontratı dağıtıyoruz
        coinFusion = await CoinFusion.deploy();
        await coinFusion.deployed();
    });

    describe("Deployment", function () {
        it("Should deploy with correct initial state", async function () {
            // Kontratın dağıtıldığından ve doğru adrese sahip olduğundan emin oluyoruz
            expect(await coinFusion.address).to.properAddress;
        });
    });

    describe("Fuse Tokens", function () {
        it("Should fuse tokens correctly", async function () {
            // Test için gereken dummy token adresleri ve değerler
            const name = "FusedToken";
            const symbol = "FTK";
            const token1 = addr1.address; // Örnek token adresi
            const token2 = addr2.address; // Örnek token adresi
            const amount1 = ethers.utils.parseUnits("100", 18);
            const amount2 = ethers.utils.parseUnits("200", 18);

            // Token'ları birleştirmek için kontrat fonksiyonunu çağırıyoruz
            await expect(coinFusion.fuseTokens(name, symbol, token1, token2, amount1, amount2))
                .to.emit(coinFusion, "TokensFused") // Events if there are any
                .withArgs(name, symbol, token1, token2, amount1, amount2);
        });
    });

    describe("Check Balance", function () {
        it("Should return correct balance", async function () {
            const userAddress = owner.address;

            // Örnek bir bakiye ayarlıyoruz
            const balance = ethers.utils.parseUnits("1000", 18);
            await coinFusion.setBalance(userAddress, balance); // setBalance fonksiyonu kontratınıza eklenmiş olmalı

            // Balance'ı kontrol ediyoruz
            const userBalance = await coinFusion.balanceOf(userAddress);
            expect(userBalance).to.equal(balance);
        });
    });
});
