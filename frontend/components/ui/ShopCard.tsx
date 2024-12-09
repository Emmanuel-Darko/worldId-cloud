"use client";

import { Fragment } from "react";
import AddressBox from "@/components/ui/AddressBox";
import { useRouter } from "next/navigation";

interface ShopCardProps {
  children?: React.ReactNode;
  title: string;
  image: string;
  price?: number | bigint;
  callback?: Function;
  merchantAddress: string;
}

export default function ShopCard({
  children,
  title,
  image,
  price,
  merchantAddress,
  callback,
}: ShopCardProps) {
  // Convert BigInt to string if it's BigInt
  const formattedPrice =
  price !== undefined
    ? typeof price === "bigint"
      ? Number(price).toFixed(2) // Convert BigInt to Number for proper formatting
      : price.toFixed(2) // Ensure it works for numbers
    : "";

  const Router = useRouter();
  const handleCardClick = () => {
    Router.push(`create-invoice?merchant=${merchantAddress}&product=${title}&price=${formattedPrice}`);
  };

  return (
    <Fragment>
      <div className="flex flex-col items-center justify-between bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-600 p-6 rounded-xl shadow-lg transition-transform hover:scale-105 hover:shadow-2xl">
        {/* Image */}
        <img
          src={image}
          alt={title}
          className="w-full max-h-64 object-cover rounded-lg mb-4 transition-transform duration-300 hover:scale-105"
        />

        {/* Title and Price */}
        <div className="text-center mb-1">
          <h3 className="text-white text-xl font-semibold tracking-wide mb-2">{title}</h3>
          {price && (
            <p className="text-yellow-400 text-lg font-bold">
              ${formattedPrice}
            </p>
          )}
        </div>

        {/* Seller Address */}
        <div className="mb-4">
          <AddressBox address={merchantAddress} />
        </div>

        {/* Buy Now Button */}
        <button
          onClick={handleCardClick}
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 w-full text-center"
        >
          Buy Now<br></br>
          <i className="text-xs font-normal">Create invoice</i>
        </button>
      </div>
    </Fragment>
  );
}