"use client"

import { Metadata } from "next";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ShopCard from "@/components/ShopCard";
import AddressBox from "@/components/AddressBox";
import AddItemModal from "@/components/AddItemModal";

import { useContract } from '@/context/ContractContext';
import Loader from "@/components/Loader";

const metadata: Metadata = {
  title: "Shop | Shop Page",
}


export default function Shop() {    

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

    const { loading, getAllProducts, addProduct, account } = useContract();
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        if (account) {
          const fetchProducts = async () => {
            const products = await getAllProducts();
            setProducts(products);
          };
          fetchProducts();
        }
      }, [getAllProducts, account]);

    const handleAddProduct = () => {
        addProduct("Laptop", "High-performance laptop", "1", 10, ["image1.png", "image2.png"]);
    };


    const handleAddItem = (itemName: any) => {
        setItems([...items, itemName]);
    };

  return (
    <div className="mb-10 flex flex-col text-center">
        <Header />
        {
            loading ? (
                <Loader />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-screen-lg p-10 mx-auto">
                    {products.map((item: any, index: number) => (
                    <ShopCard key={index} title={item?.productName} image={item?.images[0]} price={item?.quantity}>
                        <AddressBox address={item?.merchantAddress} />
                    </ShopCard>
                    ))}
                </div>
            )
        }

        <AddItemModal  />
    </div>
  );  
}