import { ethers } from "ethers";

// Adresa contractului IBT pe Ethereum:
const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; 

// ABI-ul contractului IBT:
const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "_from", "type": "address" },
      { "internalType": "uint256", "name": "_amount", "type": "uint256" }
    ],
    "name": "burn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "_to", "type": "address" },
      { "internalType": "uint256", "name": "_amount", "type": "uint256" }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
];

function getReadContract() {
  if (typeof window !== "undefined" && (window as any).ethereum) {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    return new ethers.Contract(contractAddress, contractABI, provider);
  }
  return null;
}

async function getWriteContract() {
  if (typeof window !== "undefined" && (window as any).ethereum) {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  }
  return null;
}


export const connectWallet = async (): Promise<string | null> => {
  if (typeof window !== "undefined" && (window as any).ethereum) {
    try {
      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });
      return accounts[0] || null;
    } catch (error) {
      console.error("Error connecting wallet:", error);
      return null;
    }
  } else {
    alert("Please install MetaMask!");
    return null;
  }
};

export const burnIBT = async (amount: number) => {
  try {
    const contract = await getWriteContract();
    if (!contract) throw new Error("Ethereum contract not found (burn)");

    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();
    const userAddress = await signer.getAddress();

    const decimals = 18;
    const tx = await contract.burn(
      userAddress,
      ethers.parseUnits(amount.toString(), decimals)
    );
    await tx.wait();
    console.log(`🔥 Burned ${amount} IBT on Ethereum`);
    return tx;
  } catch (error) {
    console.error("Error burning IBT:", error);
    throw error;
  }
};
export const mintIBT = async (recipient: string, amount: number) => {
  try {
    const contract = await getWriteContract();
    if (!contract) throw new Error("Ethereum contract not found (mint)");

    const decimals = 18;
    const tx = await contract.mint(
      recipient,
      ethers.parseUnits(amount.toString(), decimals)
    );
    await tx.wait();
    console.log(`✅ Minted ${amount} IBT on Ethereum -> to ${recipient}`);
    return tx;
  } catch (error) {
    console.error("Error minting IBT:", error);
    throw error;
  }
};

export const getIBTBalance = async (address: string): Promise<number> => {
  try {
    const contract = getReadContract();
    if (!contract) throw new Error("Ethereum contract not found (balance)");

    const decimals = 18;
    const balanceBN = await contract.balanceOf(address);
    return Number(ethers.formatUnits(balanceBN, decimals));
  } catch (error) {
    console.error("Error getting IBT balance:", error);
    return 0;
  }
};