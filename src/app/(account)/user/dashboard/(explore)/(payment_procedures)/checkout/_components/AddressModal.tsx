import { showToast } from "@/utils/alert";
import { address } from "framer-motion/client";
import React, { useState } from "react";
import axios from "@/utils/axios";

interface FormData {
  street: string;
  city: string;
  state: string;
  zip: string;
}
interface AddressModalProps {
  onClose: () => void; // Define the type for the onClose prop
}
type eventType = React.MouseEvent<HTMLInputElement, MouseEvent>

const AddressModal: React.FC<AddressModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "users/addaddress",
      data: { address: formData },
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("userToken")}`
      },
    })
      .then((res) => {
        onClose();
        showToast("success", res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[400px]">
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          Enter Your Address
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="street"
              className="block text-sm font-medium text-gray-700"
            >
              Street Address
            </label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="123 Main St"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="City"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700"
            >
              State/Province
            </label>
            <input
              type="text"
              id="state"
              value={formData.state}
              onChange={handleChange}
              name="state"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="State"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="zip"
              className="block text-sm font-medium text-gray-700"
            >
              ZIP/Postal Code
            </label>
            <input
              type="text"
              id="zip"
              value={formData.zip}
              onChange={handleChange}
              name="zip"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="ZIP Code"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 px-4 py-2 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;
