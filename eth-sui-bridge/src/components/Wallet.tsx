import React, { useState } from "react";
import { connectWallet } from "../utils/web3";

const Wallet: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const handleConnect = async () => {
    const address = await connectWallet();
    if (address) {
      setWalletAddress(address);
    }
  };

  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <h2>Connect to MetaMask</h2>
      {walletAddress ? (
        <p>Connected Wallet: {walletAddress}</p>
      ) : (
        <button onClick={handleConnect}>Connect Wallet</button>
      )}
    </div>
  );
};

export default Wallet;
