"use client";

import { shortenAddress } from "@/utils/helpers";

interface AddressBoxProps {
  address: string;
}

export default function AddressBox({ address }: AddressBoxProps) {
  return (
    <div className="flex items-center justify-between p-2 bg-white bg-opacity-70 rounded-lg shadow-md">
      <span className="text-xs text-gray-500">
        Seller: <span className="font-mono text-blue-600">{shortenAddress(address)}</span>
      </span>
    </div>
  );
}
