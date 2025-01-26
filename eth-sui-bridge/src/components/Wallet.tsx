import React, { useState } from "react";
import { connectWallet } from "../utils/web3";

interface WalletProps {
  onAddressChange: (address: string) => void;
}

const Wallet: React.FC<WalletProps> = ({ onAddressChange }) => {
  const [walletAddress, setWalletAddress] = useState<string>("");

  // Connect to MetaMask
  const handleConnect = async () => {
    const address = await connectWallet();
    if (address) {
      setWalletAddress(address);
      onAddressChange(address);
    }
  };

  // "Disconnect" (in practice, just clear the local state)
  const handleDisconnect = () => {
    setWalletAddress("");
    onAddressChange("");
  };

  return (
    <div>
      {walletAddress ? (
        <div>
          <p className="connected-text">Connected: {walletAddress}</p>
          <button className="disconnect-button" onClick={handleDisconnect}>
            Disconnect
          </button>
        </div>
      ) : (
        <button className="connect-metamask" onClick={handleConnect}>
          Connect MetaMask
        </button>
      )}
    </div>
  );
};

export default Wallet;
