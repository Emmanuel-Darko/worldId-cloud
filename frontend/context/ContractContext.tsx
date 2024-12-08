// ContractContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Extend the Window interface to include the ethereum property
declare global {
  interface Window {
    ethereum: any;
  }
}
import Web3 from 'web3';
import { contractABI, contractAddress } from "../contracts/KodeShop";

const ContractContext = createContext<any>(null);

interface ContractProviderProps {
  children: ReactNode;
}

const ContractProvider: React.FC<ContractProviderProps> = ({ children }) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [kodeShopContract, setKodeShopContract] = useState<any>(null);
  // Add Item Modal
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Connect to wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const _web3 = new Web3(window.ethereum);
        setWeb3(_web3);

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        
        // Initialize contract after wallet connection
        const _kodeShopContract = new _web3.eth.Contract(contractABI, contractAddress);
        setKodeShopContract(_kodeShopContract);

        console.log("Wallet connected:", accounts[0]);
      } catch (error) {
        console.error("User denied wallet connection", error);
      }
    } else {
      console.error("MetaMask is not installed");
    }
  };

  // Automatically connect wallet if already connected in MetaMask
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        const _web3 = new Web3(window.ethereum);
        const accounts = await _web3.eth.getAccounts();
        if (accounts.length > 0) {
          setWeb3(_web3);
          setAccount(accounts[0]);
          const _kodeShopContract = new _web3.eth.Contract(contractABI, contractAddress);
          setKodeShopContract(_kodeShopContract);
          console.log("Auto-connected to wallet:", accounts[0]);
        }
      }
    };

    checkWalletConnection();
  }, []);

  // Function to fetch all products
  const getAllProducts = async () => {
    if (!kodeShopContract) return [];
    try {
      setLoading(true);
      const products = await kodeShopContract.methods.getAllProducts().call();
      console.log("Fetching products", products);
      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Function to register a merchant
  const registerMerchant = async (
    merchantAddress?: string,
    merchantName?: string,
    merchantLocation?: string,
    storeName?: string
  ) => {
    if (!kodeShopContract) return;

    try {
      await kodeShopContract.methods
        .registerMerchant(account, "Kode", "Ghana", "Kode Shop")
        .send({ from: account });
      console.log("Merchant registered successfully");
    } catch (error) {
      console.error("Error registering merchant:", error);
    }
  };

  // Function to add a product
  const addProduct = async (productName: string, description: string, price: number, quantity: number, images: string[]) => {
    if (!kodeShopContract || !account) return;
    try {
      await kodeShopContract.methods
        .addProduct(productName, description, price, quantity, images)
        .send({ from: account });
      console.log("Product added successfully");
      getAllProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Values to provide in the context
  const value = {
    web3,
    account,
    showModal,
    loading,
    connectWallet,
    getAllProducts,
    addProduct,
    registerMerchant,
    setShowModal
  };

  return <ContractContext.Provider value={value}>{children}</ContractContext.Provider>;
};

// Custom hook to use the Contract context
export const useContract = () => {
  return useContext(ContractContext);
};

export default ContractProvider;
