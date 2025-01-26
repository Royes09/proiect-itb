const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  // Adresa contractului IBT ERC-20:
  const IBT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  // Cantitatea de mințat:
  const AMOUNT = ethers.parseUnits("100", 18);

  const IBT = await ethers.getContractAt("IBT", IBT_ADDRESS);

  console.log("Minting on Ethereum...");
  const tx = await IBT.mint(deployer.address, AMOUNT);
  await tx.wait();

  console.log("✅  Minted 100 IBT to:", deployer.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
