// scripts/burn-ibt.js
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  const IBT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const IBT = await ethers.getContractAt("IBT", IBT_ADDRESS);

  const AMOUNT = ethers.parseUnits("50", 18);

  console.log("Burning on Ethereum...");
  const tx = await IBT.burn(deployer.address, AMOUNT);
  await tx.wait();

  console.log("✅  Burned 50 IBT from:", deployer.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
