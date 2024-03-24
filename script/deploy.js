

const { ethers } = require("hardhat");

async function main() {
  const contractFactory = await ethers.getContractFactory("CrowdFunding");
  const contract = await contractFactory.deploy();
  await contract.getDeployedCode();
  console.log("Contract deployed to:", contract.target);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();