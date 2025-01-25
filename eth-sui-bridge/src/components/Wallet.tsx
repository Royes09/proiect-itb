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
    <div>
      {walletAddress ? (
        <p>Connected: {walletAddress}</p>
      ) : (
        <button className="connect-metamask" onClick={handleConnect}>
          Connect MetaMask
        </button>
      )}
    </div>
  );
};

export default Wallet;
