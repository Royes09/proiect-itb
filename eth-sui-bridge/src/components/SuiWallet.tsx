import React, { useEffect, useState } from "react";
import { ConnectModal, useCurrentAccount, useDisconnectWallet } from "@mysten/dapp-kit";
import "@mysten/dapp-kit/dist/index.css";

interface SuiWalletProps {
  onAddressChange: (address: string) => void;
}

const SuiWallet: React.FC<SuiWalletProps> = ({ onAddressChange }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const currentAccount = useCurrentAccount();
  const { mutate: disconnectSui } = useDisconnectWallet();

  useEffect(() => {
    if (currentAccount?.address) {
      onAddressChange(currentAccount.address);
    } else {
      onAddressChange("");
    }
  }, [currentAccount, onAddressChange]);

  const handleDisconnect = () => {
    disconnectSui();
  };

  return (
    <div>
      <ConnectModal
        trigger={
          <button className="connect-sui">
            {currentAccount?.address
              ? `Connected: ${currentAccount.address}`
              : "Connect Sui Wallet"}
          </button>
        }
        open={modalOpen}
        onOpenChange={(isOpen: boolean) => setModalOpen(isOpen)}
      />

      {currentAccount?.address && (
        <button className="disconnect-button" onClick={handleDisconnect}>
          Disconnect
        </button>
      )}
    </div>
  );
};

export default SuiWallet;
