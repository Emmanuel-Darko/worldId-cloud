"use client"
import Image from "next/image";
import { Fragment, useState } from "react";

interface ShopCardProps {
  children?: React.ReactNode,
  title: string,
  image: string,
  callback?: Function
}

export default function ShopCard({ children, title, image, callback }: ShopCardProps) {

  const handleCardClick = () => {
    if (callback) {
      return callback()
    }
  }

  return (
    <Fragment>
        <div
            className="flex flex-col items-center bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 p-6 rounded-xl shadow-lg cursor-pointer transition transform hover:scale-105 hover:shadow-2xl"
            onClick={handleCardClick}
        >
            <img 
                src="https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg" 
                alt="" 
                className="w-1/2 rounded-lg mb-4 transition-transform duration-300 hover:scale-105"
            />
            <span className="text-white text-xl font-space-grotesk tracking-wide mb-2">
                {title}
            </span>
            
            {children ? (
                <div className="flex flex-col bg-gray-100 rounded-lg p-4 w-full">
                    {children}
                </div>
                ) : (
                    <div className="text-gray-400 text-sm mt-2">No additional content</div>
                )
            }
        </div>
    </Fragment>

  );
}