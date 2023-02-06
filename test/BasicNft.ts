// import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from 'chai';
import { ethers } from 'hardhat';
// import { Contract, Signer, utils } from 'ethers';

describe('Deploy the Dutch Auction Contract', function () {


    it('Should return correct name and symbol', async function () {
        const Contract = await ethers.getContractFactory('BasicNft');
        const contract = await Contract.deploy("BasicNft", "BNFT");
        await contract.deployed();
        expect(await contract.name()).to.equal("BasicNft");
        expect(await contract.symbol()).to.equal("BNFT");
    });

    // it('Should return correct owner', async function () {});
});





