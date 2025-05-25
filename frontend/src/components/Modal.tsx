import React, { useState } from "react";
import toast from "react-hot-toast";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Record<string, string>) => void;
  title: string;
  fields: { name: string; label: string; type: string }[];
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  fields,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = (): boolean => {
    for (const field of fields) {
      const value = formData[field.name]?.trim();

      if (!value) {
        toast.error(`${field.label} is required.`);
        return false;
      }

      switch (field.name) {
        case "cardNumber":
          if (!/^\d{16}$/.test(value)) {
            toast.error("Card Number must be 16 digits.");
            return false;
          }
          break;
        case "cvv":
          if (!/^\d{3}$/.test(value)) {
            toast.error("CVV must be 3 digits.");
            return false;
          }
          break;
        case "expiry":
          if (!/^\d{2}\/\d{2}$/.test(value)) {
            toast.error("Expiry must be in MM/YY format.");
            return false;
          }
          break;
        case "amount":
          if (isNaN(Number(value)) || Number(value) <= 0) {
            toast.error("Amount must be greater than zero.");
            return false;
          }
          break;
        case "accountNumber":
          if (!/^\d{6,}$/.test(value)) {
            toast.error("Account Number must be at least 6 digits.");
            return false;
          }
          break;
        default:
          break;
      }
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      setFormData({});
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <h2 className="text-lg font-bold text-[#08313D] mb-4">{title}</h2>
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block font-medium text-sm text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E4681B]"
              />
            </div>
          ))}
          <div className="flex justify-between mt-6">
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-[#E4681B] hover:bg-[#d45b18] text-white px-4 py-2 rounded-md font-semibold"
            >
              Transact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
