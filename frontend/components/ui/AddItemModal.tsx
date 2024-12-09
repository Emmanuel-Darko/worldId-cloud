import { useState } from 'react';
import { useContract } from '@/context/ContractContext';
import { useAppContext } from "@/utils/context";

interface AddItemModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  onAddItem: (item: { name: string; image: string; price: number; description: string }) => void;
}

export default function AddItemModal() {
  const [itemName, setItemName] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  
  const { addProduct, showModal, setShowModal } = useAppContext();

  const handleAdd = () => {
    if (itemName.trim() && imageLink.trim() && price.trim() && description.trim()) {
      const product = {
        name: itemName,
        description,
        price: parseFloat(price),
        quantity: 1,
        image: [imageLink]
      };
      addProduct(
        product.name,
        product.description,
        product.price,
        product.quantity,
        product.image
      );
      setItemName("");
      setImageLink("");
      setPrice("");
      setDescription("");
      setShowModal(false);
    }
  };


  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
            
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Enter item name"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            
            <input
              type="text"
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
              placeholder="Enter image URL"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              rows={3}
            />
            
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
