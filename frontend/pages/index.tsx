"use client";

import { useAppContext } from "@/utils/context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();
  const { account, connectWallet, setShowModal, registerMerchant } = useAppContext() || {};  // Default to an empty object if null

  useEffect(() => {
    if (account) {
      router.push("/shop");
    }
  }, [account, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-blue-400">
      <div className="text-center p-8 bg-white bg-opacity-80 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to KodeShop</h1>
        <p className="text-lg text-gray-600 mb-6">Please connect your wallet to get started</p>
        {!account ? (
          <button
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg text-xl shadow-xl hover:scale-105 transition transform"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        ) : (
          <div className="text-lg text-gray-800">Wallet Connected: {account}</div>
        )}
      </div>
    </div>
  );
}