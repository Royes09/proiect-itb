import { ethers } from "ethers";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Schimbă cu adresa contractului tău
const contractABI = [
  
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "burn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export const getEthereumContract = () => {
  if (typeof window !== "undefined" && (window as any).ethereum) {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  }
  return null;
};

export const connectWallet = async () => {
  if (typeof window !== "undefined" && (window as any).ethereum) {
    try {
      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });
      return accounts[0]; // Returnează adresa contului conectat
    } catch (error) {
      console.error("Error connecting wallet:", error);
      return null;
    }
  } else {
    alert("Please install MetaMask!");
    return null;
  }
};

// 🔹 Funcție pentru a arde IBT (Ethereum)
export const burnIBT = async (amount: number) => {
  try {
    const contract = getEthereumContract();
    if (!contract) throw new Error("Ethereum contract not found");

    const signer = await contract.signer;
    const userAddress = await signer.getAddress();
    
    const tx = await contract.burn(userAddress, ethers.parseUnits(amount.toString(), 18));
    await tx.wait();

    console.log(`🔥 Burned ${amount} IBT on Ethereum`);
    return tx;
  } catch (error) {
    console.error("Error burning IBT:", error);
    throw error;
  }
};

// 🔹 Funcție pentru a mintui IBT (Ethereum)
export const mintIBT = async (recipient: string, amount: number) => {
  try {
    const contract = getEthereumContract();
    if (!contract) throw new Error("Ethereum contract not found");

    const tx = await contract.mint(recipient, ethers.parseUnits(amount.toString(), 18));
    await tx.wait();

    console.log(`✅ Minted ${amount} IBT on Ethereum`);
    return tx;
  } catch (error) {
    console.error("Error minting IBT:", error);
    throw error;
  }
};