#!/usr/bin/env bash
# bridge_ethereum_to_sui.sh
#
# 1) Burn IBT pe Ethereum
# 2) Mint IBTToken pe Sui
# -----------------------------------------------

# [1] Variabile configurabile:
PACKAGE_ID="0x530cc0448431b44046df24c33ca932158724ef46ff3f20688dbf08cb6e6fc444"
ADMIN_CAP_ID="0xad439b246c656ea4c272b0b89d7049075d2f0173c0d8a6978a9da8640954b5d4"
SUI_RECIPIENT="0x057432ba618861abfeebb4febbd0f0e287827191a4dbf3e7e93f8fd44c5a1e87"
AMOUNT="10000"
SOURCE_CHAIN="[69,84,72]"  # tot "ETH"
GAS_BUDGET=10000000

echo "=== ETH -> SUI ==="

# 2) Burn IBT pe Ethereum
echo ">> Burning IBT on Ethereum..."
cast send --rpc-url http://127.0.0.1:8545 \
  --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 \
  0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512 \
  "burn(address,uint256)" \
  0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 \
  10000000000000000000000



echo "✅  IBT burned on Ethereum."

# 3) Mint IBTToken pe Sui (mint_for_bridge)
echo ">> Minting IBTToken on Sui..."
sui client call \
  --package "$PACKAGE_ID" \
  --module IBTToken \
  --function mint_for_bridge \
  --args "$ADMIN_CAP_ID" "$SUI_RECIPIENT" "$AMOUNT" "$SOURCE_CHAIN" \
  --gas-budget "$GAS_BUDGET"

echo "✅  IBTToken minted on Sui!"
