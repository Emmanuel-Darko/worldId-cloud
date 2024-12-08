"use client"

import { shortenAddress } from "@/utils/helpers";

interface AddressBoxProps {
  address: string;
}

export default function AddressBox({ address }: AddressBoxProps) {
  return (
    <div className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="text-sm text-gray-700 font-medium">
        <span>Seller:</span>
        <address className="text-xs text-blue-600 font-mono">{shortenAddress(address)}</address>
      </div>
    </div>
  );
}
