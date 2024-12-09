import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { RequestNetwork } from '@requestnetwork/request-client.js';
import { Web3SignatureProvider } from '@requestnetwork/web3-signature';
import { getTheGraphClient } from '@requestnetwork/payment-detection';
import { useEthersSigner } from './ethers'



declare global {
  interface Window {
    ethereum?: any; // Use the `?` operator to avoid conflicts
  }
}
import Web3 from 'web3';
import { contractABI, contractAddress } from "../contracts/KodeShop";



interface ContextType {
  requestNetwork: RequestNetwork | null;
  isWalletConnectedToCipherProvider: boolean;
  connectWalletToCipherProvider: (
    signer: unknown,
    walletAddress: string,
  ) => void;
  disconnectWalletFromCipherProvider: () => void;
  isDecryptionEnabled: boolean;
  enableDecryption: (option: boolean) => void;
}

const getInitialState = () => {
  let status;
  if (typeof window !== "undefined") {
    status = localStorage?.getItem('isDecryptionEnabled');
  }
  try {
    return status ? JSON.parse(status) : false;
  } catch (error) {
    console.error('Failed to parse decryption status:', error);
    return false;
  }
};

const Context = createContext<any>(undefined);

export const Provider = ({ children }: { children: ReactNode }) => {
  const { data: walletClient } = useWalletClient();
  const signer = useEthersSigner()
  const { address, isConnected, chainId } = useAccount();
  const [requestNetwork, setRequestNetwork] = useState<RequestNetwork | null>(
    null,
  );
  const [cipherProvider, setCipherProvider] = useState<any>();
  const [
    isWalletConnectedToCipherProvider,
    setIsWalletConnectedToCipherProvider,
  ] = useState(false);

  const [isDecryptionEnabled, setisDecryptionEnabled] =  useState(getInitialState);

  const instantiateCipherProvider = async () => {
    try {
      if (typeof window !== 'undefined') {
        // FIX: This is a temporary fix to import the LitProtocolProvider only in the browser
        // TODO: Find a better way to handle this in the Request Network SDK
        const { LitProtocolProvider } = await import('@requestnetwork/lit-protocol-cipher');
        const litCipherProvider = new LitProtocolProvider(
          process.env.NEXT_PUBLIC_LIT_PROTOCOL_CHAIN || 'ethereum',
          (process.env.NEXT_PUBLIC_LIT_PROTOCOL_NETWORK || 'datil') as 'datil',
          {
            baseURL:
              process.env.NEXT_PUBLIC_REQUEST_NODE ||
              'https://gnosis.gateway.request.network/',
            headers: {}
          },
        );
        litCipherProvider.initializeClient();
        setCipherProvider(litCipherProvider);
      }
    } catch (error) {
      console.error('Failed to initialize Cipher Provider:', error);
      setCipherProvider(undefined);
    }
  };

  const initializeRequestNetwork = (walletClient: unknown) => {
    try {
      if (walletClient) {
        const web3SignatureProvider = new Web3SignatureProvider(walletClient);

      const requestNetwork = new RequestNetwork({
        cipherProvider,
        nodeConnectionConfig: {
          baseURL:
            process.env.NEXT_PUBLIC_REQUEST_NODE ||
            'https://gnosis.gateway.request.network/',
        },
        signatureProvider: web3SignatureProvider,
        httpConfig: {
          getConfirmationMaxRetry: 360,
        },
        paymentOptions: {
          getSubgraphClient: (chain: string) => {
            // Ternary because cannot dynamically access environment variables in the browser
            const paymentsSubgraphUrl =
              chain === 'arbitrum-one'
                ? process.env.NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_ARBITRUM_ONE ||
                  'https://subgraph.satsuma-prod.com/e2e4905ab7c8/request-network--434873/request-payments-arbitrum-one/api'
                : chain === 'avalanche'
                  ? process.env.NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_AVALANCHE ||
                    'https://subgraph.satsuma-prod.com/e2e4905ab7c8/request-network--434873/request-payments-avalanche/api'
                  : chain === 'base'
                    ? process.env.NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_BASE ||
                      'https://subgraph.satsuma-prod.com/e2e4905ab7c8/request-network--434873/request-payments-base/api'
                    : chain === 'bsc'
                      ? process.env.NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_BSC ||
                        'https://subgraph.satsuma-prod.com/e2e4905ab7c8/request-network--434873/request-payments-bsc/api'
                      : chain === 'celo'
                        ? process.env.NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_CELO ||
                          'https://api.studio.thegraph.com/query/67444/request-payments-celo/version/latest'
                        : chain === 'core'
                          ? process.env
                              .NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_CORE ||
                            'https://thegraph.coredao.org/subgraphs/name/requestnetwork/request-payments-core'
                          : chain === 'fantom'
                            ? process.env
                                .NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_FANTOM ||
                              'https://subgraph.satsuma-prod.com/e2e4905ab7c8/request-network--434873/request-payments-fantom/api'
                            : chain === 'fuse'
                              ? process.env
                                  .NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_FUSE ||
                                'https://api.studio.thegraph.com/query/67444/request-payments-fuse/version/latest'
                              : chain === 'mainnet'
                                ? process.env
                                    .NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_MAINNET ||
                                  'https://subgraph.satsuma-prod.com/e2e4905ab7c8/request-network--434873/request-payments-mainnet/api'
                                : chain === 'matic'
                                  ? process.env
                                      .NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_MATIC ||
                                    'https://subgraph.satsuma-prod.com/e2e4905ab7c8/request-network--434873/request-payments-matic/api'
                                  : chain === 'moonbeam'
                                    ? process.env
                                        .NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_MOONBEAM ||
                                      'https://api.studio.thegraph.com/query/67444/request-payments-moonbeam/version/latest'
                                    : chain === 'optimism'
                                      ? process.env
                                          .NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_OPTIMISM ||
                                        'https://subgraph.satsuma-prod.com/e2e4905ab7c8/request-network--434873/request-payments-optimism/api'
                                      : chain === 'sepolia'
                                        ? process.env
                                            .NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_SEPOLIA ||
                                          'https://subgraph.satsuma-prod.com/e2e4905ab7c8/request-network--434873/request-payments-sepolia/api'
                                        : chain === 'xdai'
                                          ? process.env
                                              .NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_XDAI ||
                                            'https://api.studio.thegraph.com/query/67444/request-payments-xdai/version/latest'
                                          : chain === 'zksyncera'
                                            ? process.env
                                                .NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_ZKSYNCERA ||
                                              'https://subgraph.satsuma-prod.com/e2e4905ab7c8/request-network--434873/request-payments-zksyncera/api'
                                            : undefined;
            if (!paymentsSubgraphUrl) {
              throw new Error(
                `Cannot get subgraph client for unknown chain: ${chain}`,
              );
            }
            return getTheGraphClient(chain, paymentsSubgraphUrl);
          },
        },
      });
      setRequestNetwork(requestNetwork);
      }
    } catch (error) {
      console.error('Failed to initialize the Request Network:', error);
      setRequestNetwork(null);
    }
  };

  const connectWalletToCipherProvider = async (
    signer: any,
    walletAddress: string,
  ) => {
    if (cipherProvider && signer && walletAddress) {
      try {
        await cipherProvider?.getSessionSignatures(signer, walletAddress);
        console.log('Connected to Cipher Provider');
        setIsWalletConnectedToCipherProvider(true);
      } catch (error) {
        console.error('Failed to connect to Cipher Provider:', error);
        setIsWalletConnectedToCipherProvider(false);
      }
    }
  };

  const disconnectWalletFromCipherProvider = () => {
    if (cipherProvider) {
      try {
        setRequestNetwork(null);
        cipherProvider?.disconnectWallet();
        setIsWalletConnectedToCipherProvider(false);
        setCipherProvider(undefined);
      } catch (error) {
        console.error('Failed to disconnect from Cipher Provider:', error);
        // Still reset state to ensure clean disconnection
        setIsWalletConnectedToCipherProvider(false);
        setCipherProvider(undefined);
        setRequestNetwork(null);
      }
    }
  };

const enableDecryption = async (option: boolean) => {
  if (cipherProvider && signer && address) {
    try {
      if(option) {
        await connectWalletToCipherProvider(signer, address as string);
      } 
      cipherProvider.enableDecryption(option);
      setisDecryptionEnabled(option);
    } catch (error) {
      console.error('Failed to enable/disable decryption:', error);
      setisDecryptionEnabled(false);
    }
  } else {
    setisDecryptionEnabled(false);
  }
};

  useEffect(() => {
    if (walletClient && isConnected && address && chainId) {
      instantiateCipherProvider();
    }
  }, [walletClient, chainId, address, isConnected]);

  useEffect(() => {
    if (cipherProvider) {
      initializeRequestNetwork(walletClient);
      enableDecryption(isDecryptionEnabled)
    }
  }, [cipherProvider, walletClient]);

  useEffect(() => {
    localStorage.setItem('isDecryptionEnabled', JSON.stringify(isDecryptionEnabled));
  }, [isDecryptionEnabled])




  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [kodeShopContract, setKodeShopContract] = useState<any>(null);
  // Add Item Modal
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [posting, setPosting] = useState<boolean>(false);

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
    setPosting(true);
    try {
      await kodeShopContract.methods
        .registerMerchant(account, "Kode", "Ghana", "Kode Shop")
        .send({ from: account });
      console.log("Merchant registered successfully");
      return true;
    } catch (error) {
      console.error("Error registering merchant:", error);
    } finally {
      setPosting(false);
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




  return (
    <Context.Provider
      value={{
        requestNetwork,
        isWalletConnectedToCipherProvider,
        connectWalletToCipherProvider,
        disconnectWalletFromCipherProvider,
        isDecryptionEnabled,
        enableDecryption: enableDecryption,


        web3,
        account,
        showModal,
        loading,
        posting,
        connectWallet,
        getAllProducts,
        addProduct,
        registerMerchant,
        setShowModal
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useAppContext must be used within a Context Provider');
  }
  return context;
};
