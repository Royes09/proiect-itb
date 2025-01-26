#!/usr/bin/env bash
# bridge_sui_to_ethereum.sh
#
# 1) Burn IBTToken pe Sui
# 2) Mint IBT pe Ethereum
# ------------------------------------------------

# [1] Variabile configurabile:
PACKAGE_ID="0x530cc0448431b44046df24c33ca932158724ef46ff3f20688dbf08cb6e6fc444"
ADMIN_CAP_ID="0xad439b246c656ea4c272b0b89d7049075d2f0173c0d8a6978a9da8640954b5d4"
COIN_ID="0x636e0c6dc4c3271d2b2521e2d5a076af3e9f33f2d497ffbe14e1838901c68f6c"  # Coin<IBTToken> deținut de ADMIN_CAP
DEST_CHAIN="[69,84,72]"  # ASCII pentru "ETH" -> vector<u8>
GAS_BUDGET=10000000

echo "=== SUI -> ETH ==="

# 2) Ardem IBTToken pe Sui
echo ">> Burning IBTToken on Sui with 'burn_for_bridge' ..."
sui client call \
  --package "$PACKAGE_ID" \
  --module IBTToken \
  --function burn_for_bridge \
  --args "$ADMIN_CAP_ID" "$COIN_ID" "$DEST_CHAIN" \
  --gas-budget "$GAS_BUDGET"

echo "✅  IBTToken burned on Sui."

# 3) Mint IBT pe Ethereum
echo ">> Mint IBT on Ethereum (Hardhat script) ..."
cast send --rpc-url http://127.0.0.1:8545 \
  --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 \
  0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512 \
  "mint(address,uint256)" \
  0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266\
  10000000000000000000000

echo "✅  IBT minted on Ethereum!"
