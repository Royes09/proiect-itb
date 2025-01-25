import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import SuiWallet from "./components/SuiWallet";
import Wallet from "./components/Wallet";
import { burnIBT, mintIBT } from "./utils/web3";
import { burnIBTToken, mintIBTToken } from "./utils/sui";
import "./styles.css";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [amount, setAmount] = useState("");
  const [direction, setDirection] = useState<"MetaMaskToSui" | "SuiToMetaMask">("MetaMaskToSui");

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
        await mintIBTToken("0x412af6e1acd5aa353f6143791ecf79051a333f6288b5093cbbd574bd79fbca66", Number(amount));
      } else {
        console.log(`Burning ${amount} IBTToken on Sui...`);
        await burnIBTToken("0x412af6e1acd5aa353f6143791ecf79051a333f6288b5093cbbd574bd79fbca66", Number(amount));

        console.log(`Minting ${amount} IBT on Ethereum...`);
        await mintIBT("0x5FbDB2315678afecb367f032d93F642f64180aa3", Number(amount));
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
            <div className="wallet-buttons">
              <Wallet />
              <SuiWallet />
            </div>

            <div className="transfer-controls">
              <label>
                Amount:
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.0"
                />
              </label>
            </div>

            <div className="transfer-buttons">
              <button onClick={() => setDirection("MetaMaskToSui")} className={direction === "MetaMaskToSui" ? "active" : ""}>
                MetaMask → Sui
              </button>
              <button onClick={() => setDirection("SuiToMetaMask")} className={direction === "SuiToMetaMask" ? "active" : ""}>
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
