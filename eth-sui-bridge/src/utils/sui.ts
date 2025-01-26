// sui.ts
import { SuiClient } from "@mysten/sui/client";

const SUI_PACKAGE_ID = "0x530cc0448431b44046df24c33ca932158724ef46ff3f20688dbf08cb6e6fc444";

const IBT_TOKEN_TYPE = `${SUI_PACKAGE_ID}::IBTToken::IBTToken`;

const suiClient = new SuiClient({ url: "https://fullnode.testnet.sui.io" });

export const mintIBTToken = async (recipient: string, amount: number) => {
  try {
    const tx = await suiClient.executeTransactionBlock({
      sender: recipient, // The address paying for gas & signing
      transactionBlock: {
        gasBudget: 10000000,
        kind: "call",
        packageObjectId: SUI_PACKAGE_ID,
        module: "IBTToken",
        function: "mint",
        // `arguments`: [ recipient, amount ]
        arguments: [
          recipient,
          amount.toString(),
        ],
      },
    });

    console.log(`✅ Minted ${amount} IBTToken on Sui for ${recipient}`);
    return tx;
  } catch (error) {
    console.error("Error minting IBTToken:", error);
    throw error;
  }
};

export const burnIBTToken = async (sender: string, amount: number) => {
  try {
    const tx = await suiClient.executeTransactionBlock({
      sender,
      transactionBlock: {
        gasBudget: 10000000,
        kind: "call",
        packageObjectId: SUI_PACKAGE_ID,
        module: "IBTToken",
        function: "burn",
        // `arguments`: [ amount ]
        arguments: [
          amount.toString(),
        ],
      },
    });

    console.log(`🔥 Burned ${amount} IBTToken on Sui from ${sender}`);
    return tx;
  } catch (error) {
    console.error("Error burning IBTToken:", error);
    throw error;
  }
};

export const getIBTTokenBalance = async (address: string): Promise<number> => {
  try {
    const { totalBalance } = await suiClient.getBalance({
      owner: address,
      coinType: IBT_TOKEN_TYPE,
    });

    const balanceNumber = Number(totalBalance) / 1e9;
    return balanceNumber;
  } catch (error) {
    console.error("Error getting IBTToken balance:", error);
    return 0;
  }
};
