"use client"
import Image from "next/image";
import { Fragment, useState } from "react";

interface ShopCardProps {
  children?: React.ReactNode,
  title: string,
  image: string,
  price?: number | bigint,
  callback?: Function
}

export default function ShopCard({ children, title, image, price, callback }: ShopCardProps) {
  // Convert BigInt to string if it's BigInt
  const formattedPrice = price !== undefined ? (typeof price === "bigint" ? price.toString() : price.toFixed(2)) : "";

  const handleCardClick = () => {
    if (callback) {
      return callback()
    }
  }

  return (
    <Fragment>
    <div
        className="flex flex-col items-center bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-600 p-6 rounded-xl shadow-lg cursor-pointer transition-transform hover:scale-105 hover:shadow-2xl"
        onClick={handleCardClick}
    >
        <img
            src={image}
            alt=""
            className="w-1/2 rounded-lg mb-4 transition-transform duration-300 hover:scale-105"
        />
        <span className="text-white text-xl font-space-grotesk tracking-wide mb-2">
            {title} &nbsp; {price && <span className="text-yellow-400">(${formattedPrice})</span>}
        </span>

        {children && (
            <div className="flex flex-col bg-white bg-opacity-60 rounded-lg p-4 w-full">
                {children}
            </div>
        )}
    </div>
</Fragment>

  );
}