import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import SuiWallet from "./components/SuiWallet";
import Wallet from "./components/Wallet";

// Ethereum side
import {
  burnIBT,
  mintIBT,
  getIBTBalance,
} from "./utils/web3";

// Sui side
import {
  burnIBTToken,
  mintIBTToken,
  getIBTTokenBalance,
} from "./utils/sui";

import "./styles.css";

const queryClient = new QueryClient();

const App: React.FC = () => {

  const [ethWalletAddress, setEthWalletAddress] = useState<string>("");
  const [suiWalletAddress, setSuiWalletAddress] = useState<string>("");

  const [ethBalance, setEthBalance] = useState<number>(0);
  const [suiBalance, setSuiBalance] = useState<number>(0);

  const [amount, setAmount] = useState("");
  const [direction, setDirection] =
    useState<"MetaMaskToSui" | "SuiToMetaMask">("MetaMaskToSui");

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        if (ethWalletAddress) {
          const bal = await getIBTBalance(ethWalletAddress);
          setEthBalance(bal);
        } else {
          setEthBalance(0);
        }

        if (suiWalletAddress) {
          const bal = await getIBTTokenBalance(suiWalletAddress);
          setSuiBalance(bal);
        } else {
          setSuiBalance(0);
        }
      } catch (error) {
        console.error("Error fetching balances:", error);
      }
    };

    fetchBalances();
  }, [ethWalletAddress, suiWalletAddress]);

  const handleTransfer = async () => {
    if (!amount || Number(amount) <= 0) {
      alert("Enter a valid amount.");
      return;
    }

    try {
      if (direction === "MetaMaskToSui") {
        console.log(`Burning ${amount} IBT on Ethereum...`);
        await burnIBT(Number(amount));

        console.log(`Minting ${amount} IBTToken on Sui...`);
        await mintIBTToken(suiWalletAddress, Number(amount));

      } else {
        console.log(`Burning ${amount} IBTToken on Sui...`);
        await burnIBTToken(suiWalletAddress, Number(amount));

        console.log(`Minting ${amount} IBT on Ethereum...`);
        await mintIBT(ethWalletAddress, Number(amount));
      }

      alert("Transfer successful!");
    } catch (error) {
      console.error("Transfer error:", error);
      alert("Transfer failed. Check console for details.");
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider>
        <WalletProvider autoConnect>
          <div className="container">
            <h1>IBT / IBTToken Bridge</h1>
            <div className="wallet-section">
              <div className="wallet-box">
                <h2>Ethereum Wallet</h2>
                <Wallet onAddressChange={(addr) => setEthWalletAddress(addr)} />
                <div className="balance">
                  <span className="balance-label">IBT Balance:</span>
                  <span>{ethBalance}</span>
                </div>
              </div>
              <div className="wallet-box">
                <h2>Sui Wallet</h2>
                <SuiWallet onAddressChange={(addr) => setSuiWalletAddress(addr)} />
                <div className="balance">
                  <span className="balance-label">IBTToken Balance:</span>
                  <span>{suiBalance}</span>
                </div>
              </div>
            </div>
            <div className="transfer-controls">
              <label htmlFor="amount-input">Amount:</label>
              <input
                id="amount-input"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
              />
            </div>

            <div className="transfer-buttons">
              <button
                onClick={() => setDirection("MetaMaskToSui")}
                className={direction === "MetaMaskToSui" ? "active" : ""}
              >
                MetaMask → Sui
              </button>
              <button
                onClick={() => setDirection("SuiToMetaMask")}
                className={direction === "SuiToMetaMask" ? "active" : ""}
              >
                Sui → MetaMask
              </button>
            </div>

            <button className="transfer-button" onClick={handleTransfer}>
              Transfer
            </button>
          </div>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
};

export default App;
