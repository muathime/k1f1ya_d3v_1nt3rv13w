import React, { useState } from "react";
import Modal from "./Modal";
import toast from "react-hot-toast";
import { logTransaction } from "../api/api";

interface Props {
  onRefresh: () => void;
  showKYCModal: any;
  user: any;
  balance: number;
}

const CashInOutPanel: React.FC<Props> = ({
  showKYCModal,
  onRefresh,
  user,
  balance,
}) => {
  const [kycStatus, setKycStatus] = useState(
    showKYCModal ? "Pending" : "Verified"
  );

  const [cashInOpen, setCashInOpen] = useState(false);
  const [cashOutOpen, setCashOutOpen] = useState(false);

  const handleCashInSubmit = async (data: any) => {
    data.user_id = user.id;
    data.date = new Date().toLocaleString();
    data.type = "Cash In";

    const result = await logTransaction(data);

    if (result?.message) {
      toast.success(
        "Your cash-in transaction was completed successfully. Thank you!."
      );
    } else {
      toast.error("Transaction failed.");
    }

    onRefresh();
  };

  const handleCashOutSubmit = async (data: any) => {
    if (parseFloat(data.amount) > balance) {
      toast.error("Insufficient balance for cash-out transaction.");
      return;
    }

    data.user_id = user.id;
    data.date = new Date().toLocaleString();
    data.type = "Cash Out";

    const result = await logTransaction(data);

    if (result?.message) {
      toast.success(
        "Your cash-out transaction was completed successfully. Thank you!."
      );
    } else {
      toast.error("Transaction failed.");
    }

    onRefresh();
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 h-full flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold text-[#08313D] mb-4 text-center">
          Cash Operations
        </h2>
        <button
          onClick={() => setCashInOpen(true)}
          className="w-full bg-[#E4681B] hover:bg-[#d45b18] text-white py-2 px-4 rounded-lg mb-3"
        >
          Cash In
        </button>
        <button
          onClick={() => setCashOutOpen(true)}
          className="w-full bg-[#08313D] hover:bg-[#06282f] text-white py-2 px-4 rounded-lg"
        >
          Cash Out
        </button>
      </div>

      <div className="mt-10 text-sm">
        <>
          {balance < 50 ? (
            <div className="text-red-600 font-medium mb-2">
              ⚠️ Low Balance: Your Balance is ${balance}
            </div>
          ) : (
            <div className="text-green-600 font-medium mb-2">
              💰 Your Balance is: ${balance}
            </div>
          )}
        </>

        <div className="text-gray-700">
          <p className="mb-1">
            KYC Status:{" "}
            <span className="font-semibold text-green-600">{kycStatus}</span>
          </p>
          {kycStatus !== "Verified" && (
            <button
              onClick={() => setKycStatus("Verified")}
              className="text-[#E4681B] underline"
            >
              Complete KYC
            </button>
          )}
        </div>
      </div>

      {/* Dialogs */}
      <Modal
        isOpen={cashInOpen}
        onClose={() => setCashInOpen(false)}
        title="Cash In - Add Funds (USD)"
        onSubmit={(data) => handleCashInSubmit(data)}
        fields={[
          { name: "cardNumber", label: "Card Number", type: "text" },
          { name: "cardName", label: "Cardholder Name", type: "text" },
          { name: "expiry", label: "Expiry Date (MM/YY)", type: "text" },
          { name: "cvv", label: "CVV", type: "password" },
          { name: "amount", label: "Amount (USD)", type: "number" },
        ]}
      />

      <Modal
        isOpen={cashOutOpen}
        onClose={() => setCashOutOpen(false)}
        title="Cash Out - Send Funds"
        onSubmit={(data) => handleCashOutSubmit(data)}
        fields={[
          { name: "bankName", label: "Bank Name", type: "text" },
          { name: "accountNumber", label: "Account Number", type: "text" },
          { name: "amount", label: "Amount (USD)", type: "number" },
        ]}
      />
    </div>
  );
};

export default CashInOutPanel;
