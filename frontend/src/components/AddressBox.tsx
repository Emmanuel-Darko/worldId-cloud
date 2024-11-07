"use client"

export default function AddressBox({ children, address }: any) {
  
  return (
    <div className="flex flex-col text-center">
        Seller address: <address>{address}</address>
    </div>
  );
}