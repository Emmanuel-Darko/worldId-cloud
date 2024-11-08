import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("KodeShop", function () {
  // Fixture to deploy the contract and initialize data
  async function deployKodeShopFixture() {
    const [owner, merchant] = await ethers.getSigners();
    const KodeShop = await ethers.getContractFactory("KodeShop");
    const kodeShop = await KodeShop.deploy(); // Deploy the contract

    // Wait for contract deployment (waits for receipt)
    const deploymentTx = await kodeShop.deploymentTransaction();
    if (deploymentTx) {
      await deploymentTx.wait();
    } else {
      throw new Error("Deployment transaction is null");
    }

    // Register the merchant (owner does this)
    await kodeShop.connect(owner).registerMerchant(merchant.address, "Default Merchant", "Ghana", "KodeTech");

    // Set up initial products in dollars (price in USD, e.g., $1.0 and $0.5)
    const products = [
      {
        productName: "Laptop",
        description: "High-performance laptop",
        price: ethers.parseUnits("1.0", 18), // Convert price to 18 decimal units (1.0 USD)
        quantity: 10,
        images: ["image1.png", "image2.png"],
        merchantAddress: merchant.address
      },
      {
        productName: "Smartphone",
        description: "Latest model smartphone",
        price: ethers.parseUnits("0.5", 18), // Convert price to 18 decimal units (0.5 USD)
        quantity: 20,
        images: ["image3.png", "image4.png"],
        merchantAddress: merchant.address
      }
    ];

    // Add products as the merchant
    await kodeShop.connect(merchant).addProduct(
      products[0].productName,
      products[0].description,
      products[0].price,
      products[0].quantity,
      products[0].images,
      {}
    );

    await kodeShop.connect(merchant).addProduct(
      products[1].productName,
      products[1].description,
      products[1].price,
      products[1].quantity,
      products[1].images,
      {}
    );

    return { kodeShop, products, owner, merchant };
  }

  it("should fetch all products", async function () {
    const { kodeShop, products } = await loadFixture(deployKodeShopFixture);

    // Fetch all products
    const fetchedProducts = await kodeShop.getAllProducts();

    // Check if the fetched products match the added products
    expect(fetchedProducts.length).to.equal(products.length);

    for (let i = 0; i < fetchedProducts.length; i++) {
      expect(fetchedProducts[i].productName).to.equal(products[i].productName);
      expect(fetchedProducts[i].description).to.equal(products[i].description);
      expect(fetchedProducts[i].price).to.equal(products[i].price);
      expect(fetchedProducts[i].quantity).to.equal(products[i].quantity);
      expect(fetchedProducts[i].merchantAddress).to.equal(products[i].merchantAddress);
      expect(fetchedProducts[i].images).to.deep.equal(products[i].images);
    }
  });
});
