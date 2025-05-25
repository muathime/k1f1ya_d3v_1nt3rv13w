import React, { useState } from "react";
import toast from "react-hot-toast";

interface KYCModalProps {
  onSubmit: (data: {
    full_name: string;
    dateOfBirth: string;
    idNumber: string;
    phoneNumber?: string;
  }) => Promise<void>;
}

const KYCModal: React.FC<KYCModalProps> = ({ onSubmit }) => {
  const [full_name, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!/^\w+\s+\w+/.test(full_name.trim())) {
      toast.error("Please enter your full name (at least two words).");
      return;
    }

    const dobDate = new Date(dateOfBirth);
    if (!dateOfBirth || dobDate >= new Date()) {
      toast.error("Date of birth must be in the past.");
      return;
    }

    if (idNumber.trim().length < 12) {
      toast.error("Fayda number must be at least 12 characters long.");
      return;
    }

    if (phoneNumber.trim()) {
      const phoneRegex = /^\+2517\d{8}$/;
      if (!phoneRegex.test(phoneNumber.trim())) {
        toast.error("Phone number must be in the format +2517XXXXXXXX.");
        return;
      }
    }

    setLoading(true);
    try {
      await onSubmit({ full_name, dateOfBirth, idNumber, phoneNumber });
    } catch (error) {
      toast.error("An unexpected error occurred during KYC submission.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <h2 className="text-xl font-bold mb-6 text-[#08313D] text-center">
          Complete Basic KYC
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-semibold">
              Full Name
            </label>
            <input
              type="text"
              value={full_name}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E4681B]"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-semibold">
              Date of Birth
            </label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E4681B]"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-semibold">
              Fayda Number
            </label>
            <input
              type="text"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E4681B]"
              placeholder="Passport or National ID"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-semibold">
              Phone Number (optional)
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E4681B]"
              placeholder="+254 700 123456"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E4681B] hover:bg-[#d45b18] text-white py-3 rounded-md font-semibold transition disabled:opacity-60"
          >
            {loading ? "Processing..." : "Submit KYC"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default KYCModal;
