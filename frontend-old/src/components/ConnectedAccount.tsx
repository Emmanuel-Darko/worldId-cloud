import { shortenAddress } from "@/utils/helpers";

interface ConnectedAccountProps {
  address: string;
}

export default function ConnectedAccount({ address }: ConnectedAccountProps) {
  return (
    <div className="flex items-center space-x-4 p-2 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl shadow-lg text-white">
      <div className="flex items-center space-x-1">
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-600 font-semibold">
          {/* Optional: Use an icon or avatar here */}
          <span className="text-md">💼</span>
        </div>
        <div className="text-sm">
          <div className="text-xs text-blue-200">{shortenAddress(address)}</div>
        </div>
      </div>
      <div className="text-sm font-semibold text-teal-200">
        Connected
      </div>
    </div>
  );
}
