# KodeShop: A Decentralized Marketplace

KodeShop is a decentralized marketplace where merchants can list products, manage inventory, and interact directly with users. It leverages blockchain technology for security, transparency, and eliminating intermediary fees. The platform also incorporates World ID verification for enhanced user authentication.

## Features

- **Merchant Registration**: Allows merchants to register and list products.
- **Product Listing**: Merchants can add, update, or remove products.
- **User Interaction**: Users can browse and purchase items directly from merchants.
- **World ID Verification**: World ID is integrated for secure user authentication and validation.

## Project Structure

The project consists of two main parts:
1. **Blockchain (Smart Contracts)**: Handles all the backend operations using Ethereum and Solidity.
2. **Frontend**: A React-based interface for users and merchants to interact with the blockchain.

### Blockchain Directory

This directory contains the smart contract for the KodeShop decentralized marketplace.

#### Steps to Run Blockchain Directory

1. **Install Dependencies**  
   First, navigate to the `blockchain` directory and install the required dependencies.

   ```bash
   cd blockchain
   npm install

2. **Set Up Environment Variables**
Create a .env file and add the following environment variables:

    ```bash
    makefile
    Copy code
    INFURA_PROJECT_ID=<Your Infura Project ID>
    PRIVATE_KEY=<Your Wallet Private Key>

3. Deploy Smart Contracts
Deploy the smart contracts to your desired network (e.g., Sepolia, Unichain). Use Hardhat to deploy:

bash
Copy code
npx hardhat run scripts/deploy.js --network sepolia
Verify Contracts
After deployment, you can verify the contract:

bash
Copy code
npx hardhat verify --network sepolia <Contract_Address>
Frontend Directory
This directory contains the frontend for KodeShop, built with React.

Steps to Run Frontend Directory
Install Dependencies
Navigate to the frontend directory and install the required dependencies.

bash
Copy code
cd frontend
npm install
Connect to Blockchain
Ensure that the blockchain network is up and running. The frontend connects to it using Web3.js to interact with the deployed smart contract.

Run the Development Server
Run the frontend development server:

bash
Copy code
npm run dev
This will start the application at http://localhost:3000.

Wallet Connection
The frontend allows users to connect their wallet (e.g., MetaMask) to interact with the blockchain. Ensure that users are connected to the correct network (e.g., Sepolia or Unichain).

World ID Verification
World ID is integrated into the frontend for user authentication. Before adding products or interacting with the marketplace, users must verify their identity via World ID.

World ID Verification Integration
World ID provides secure and decentralized verification for users. This feature is used to ensure that the users interacting with the marketplace are legitimate, avoiding fraudulent activities.

User Verification: Upon connecting their wallet, users are required to pass through World ID verification. This ensures that only verified users can participate in actions like purchasing or adding products.

Verification Flow:

The user connects their wallet (MetaMask).
The user verifies their identity using World ID.
Once verified, the user can interact with the platform (e.g., add products, make purchases).
Contribution
If you wish to contribute to this project, please fork the repository and submit a pull request with your proposed changes.

License
This project is open-source and licensed under the MIT License.