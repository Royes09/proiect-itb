import { SuiClient } from "@mysten/sui";


const suiClient = new SuiClient({ url: "https://fullnode.testnet.sui.io" });

const SUI_PACKAGE_ID = "0x412af6e1acd5aa353f6143791ecf79051a333f6288b5093cbbd574bd79fbca66"; // Adresa contractului IBTToken pe Sui

// Funcție pentru a arde IBTToken pe Sui
export const burnIBTToken = async (walletAddress: string, amount: number) => {
  try {
    const tx = await suiClient.executeTransactionBlock({
      sender: walletAddress,
      transactionBlock: {
        gasBudget: 10000000,
        kind: "call",
        packageObjectId: SUI_PACKAGE_ID,
        module: "ibt_token",
        function: "burn",
        arguments: [amount.toString()],
      },
    });

    console.log(`🔥 Burned ${amount} IBTToken on Sui`);
    return tx;
  } catch (error) {
    console.error("Error burning IBTToken:", error);
    throw error;
  }
};

// Funcție pentru a mintui IBTToken pe Sui
export const mintIBTToken = async (recipient: string, amount: number) => {
  try {
    const tx = await suiClient.executeTransactionBlock({
      sender: recipient,
      transactionBlock: {
        gasBudget: 10000000,
        kind: "call",
        packageObjectId: SUI_PACKAGE_ID,
        module: "ibt_token",
        function: "mint",
        arguments: [recipient, amount.toString()],
      },
    });

    console.log(`✅ Minted ${amount} IBTToken on Sui`);
    return tx;
  } catch (error) {
    console.error("Error minting IBTToken:", error);
    throw error;
  }
};
