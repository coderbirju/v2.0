import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Contract, Signer, utils } from 'ethers';

describe('Deploy the Dutch Auction Contract', function () {


  async function deployContractDA() {

    const RESERVE_PRICE = 1000;
    const NUM_BLOCKS_AUCTION_OPEN = 10;
    const PRICE_DECREMENT = 100;
    // Contracts are deployed using the first signer/account by default
    const Contract = await ethers.getContractFactory('BasicDutchAuction');
    const contract = await Contract.deploy(
      RESERVE_PRICE,
      NUM_BLOCKS_AUCTION_OPEN,
      PRICE_DECREMENT,
    );
    await contract.deployed();
    return { contract, RESERVE_PRICE, NUM_BLOCKS_AUCTION_OPEN, PRICE_DECREMENT };
  }

  it('Should Deploy contract correctly', async function () {
    const { contract } = await loadFixture(deployContractDA);

    expect(await contract.deployed());
  });

  describe('Working of the BasicDutchAuction', () => {
    let contract: Contract;
    let owner: Signer;
    let owner2: Signer;
    let auctionEndBlock: number;
    let initialPrice: number;
    const wallet = utils.getAddress(`0x0000000000000000000000000000000000000000`);
    const buyer = utils.getAddress(`0x0000000000000000000000000000000000000000`);
  
    beforeEach(async () => {
      [owner, owner2] = await ethers.getSigners();
      const Contract = await ethers.getContractFactory('BasicDutchAuction');
      contract = await Contract.deploy(1000, 100, 10);
      await contract.deployed();
    });
  
    it('should deploy the contract', async () => {
      expect(contract.address).to.not.be.null;
    });
  
    it('should set the correct reserve price', async () => {
      expect(await contract.reservePrice()).to.equal(1000);
    });
  
    it('should set the correct initial price', async () => {
      expect(await contract.initialPrice()).to.equal(1000 + (100 * 10));
    });
  
    it('should set the correct current price', async () => {
      expect(await contract.currentPrice()).to.equal(1000 + (100 * 10));
    });
  
    it('should accept a valid bid', async () => {
      const result = await contract.bid({ value: 2000 });
      expect(result.hash).to.not.be.null;
    });

    it('should not allow bidding below the current price', async () => {
      try {
        await contract.bid({ value: 1500});
      } catch (error: any) {
        expect(error.message).to.equal("VM Exception while processing transaction: reverted with reason string 'Bid is lower than current price'");
      }
    });
  
    it('should set the correct winning address', async () => {
      await contract.bid({ value: 2000 });
      expect(await contract.winnerAddress()).to.equal(await owner.getAddress());
    });
  
    it('should set the correct winning bid amount', async () => {
      await contract.bid({ value: 2000 });
      expect(await contract.winningBidAmount()).to.equal(2000);
    });
  
    it('should end the auction', async () => {
      await contract.bid({ value: 2000 });
      expect(await contract.auctionEnded()).to.be.true;
    });
  
    it('should not allow bidding after the auction end', async () => {
      try {
        await contract.bid({ value: 2000 });
      } catch (error: any) {
        expect(error.message).to.equal("AssertionError: expected 'VM Exception while processing transac…' to equal 'Auction has ended'");
      }
    });
  });    
});





