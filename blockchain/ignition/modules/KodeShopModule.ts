import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// Default values for deployment
const DEFAULT_NAME = "KodeShop";
const DEFAULT_SYMBOL = "KDS";

const KodeShopModule = buildModule("KodeShopModule", (m) => {
  const contractName = m.getParameter("name", DEFAULT_NAME);
  const contractSymbol = m.getParameter("symbol", DEFAULT_SYMBOL);

  // Deploy the KodeShop contract
  const kodeShop = m.contract("KodeShop", []);

  return { kodeShop };
});

export default KodeShopModule;