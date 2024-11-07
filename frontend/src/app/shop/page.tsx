"use client"

import { Metadata } from "next";
import { useState } from "react";
import ShopCard from "@/components/ShopCard";
import AddressBox from "@/components/AddressBox";
import AddItemModal from "@/components/AddItemModal";
import { VerificationLevel, IDKitWidget, useIDKit } from "@worldcoin/idkit";
import type { ISuccessResult } from "@worldcoin/idkit";
import { verify } from "../actions/verify";

const metadata: Metadata = {
  title: "Shop | Shop Page",
}


export default function Shop() {
    const app_id = process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`;
    const action = process.env.NEXT_PUBLIC_WLD_ACTION;
    
    if (!app_id) {
        throw new Error("app_id is not set in environment variables!");
    }
    if (!action) {
        throw new Error("action is not set in environment variables!");
    }
    
    const { setOpen } = useIDKit();

    const onSuccess = (result: ISuccessResult) => {
        // This is where you should perform frontend actions once a user has been verified, such as redirecting to a new page
        if (window.confirm("Successfully verified with World ID! PROCEED TO ADD ITEM")) {
            setShowModal(true);
        }
    };
    
    const handleProof = async (result: ISuccessResult) => {
        console.log(
          "Proof received from IDKit, sending to backend:\n",
          JSON.stringify(result)
        ); // Log the proof from IDKit to the console for visibility
        const data = await verify(result);
        if (data.success) {
          console.log("Successful response from backend:\n", JSON.stringify(data)); // Log the response from our backend for visibility
        } else {
          throw new Error(`Verification failed: ${data.detail}`);
        }
    };

    const [items, setItems] = useState<any>([
        {
            name: "Item 1",
            address: "0x1234567890",
            description: "This is a shop",
            image: "https://via.placeholder.com/150",
        },
        {
            name: "Item 2",
            address: "0x1234567890",
            description: "This is a shop",
            image: "https://via.placeholder.com/150",
        },
        {
            name: "Item 3",
            address: "0x1234567890",
            description: "This is a shop",
            image: "https://via.placeholder.com/150",
        },
    ])

    // Add Item Modal
    const [showModal, setShowModal] = useState<boolean>(false);

    const handleAddItem = (itemName: any) => {
        setItems([...items, itemName]);
    };

  return (
    <div className="mb-20 flex flex-col text-center">
        <div className="border w-full flex items-center justify-center mb-5 p-5">
            <h1 className="justify-self-center text-4xl font-bold">Shop</h1>
            <button className="absolute right-[30px] bg-[black] text-white px-5 py-3 rounded-lg"
                onClick={() => setOpen(true)}
            >Post Item</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-screen-lg mx-auto">
            {items.map((item: any, index: number) => (
            <ShopCard key={index} title={item.name} image={item.image}>
                <AddressBox address={item.address} />
            </ShopCard>
            ))}
        </div>

        <IDKitWidget
          action={action}
          app_id={app_id}
          onSuccess={onSuccess}
          // handleVerify={handleProof}
          verification_level={VerificationLevel.Orb} // Change this to VerificationLevel.Device to accept Orb- and Device-verified users
        />

        <AddItemModal showModal={showModal} setShowModal={setShowModal} onAddItem={handleAddItem} />
    </div>
  );  
}