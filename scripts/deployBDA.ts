import { ethers } from "hardhat";

async function main() {
    const RESERVE_PRICE = 1000;
    const BLOCKS_TO_AUCTION = 10;
    const PRICE_DECREASE = 100;
    const TOKEN_ID = 1;

    const BasicDutchAuction = await ethers.getContractFactory("NFTDutchAuction"); 
    const NftContract = await ethers.getContractFactory("BasicNft");
    const nftContract = await NftContract.deploy("BasicNft", "BNFT");
    await nftContract.deployed();
    const basicDutchAuction = await BasicDutchAuction.deploy( nftContract.address, TOKEN_ID, RESERVE_PRICE, BLOCKS_TO_AUCTION, PRICE_DECREASE);

    await basicDutchAuction.deployed();

    console.log(`BasicDutchAuction deployed to: ${basicDutchAuction.address} with reserve price: ${RESERVE_PRICE} and blocks to auction: ${BLOCKS_TO_AUCTION} and price decrease: ${PRICE_DECREASE}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});