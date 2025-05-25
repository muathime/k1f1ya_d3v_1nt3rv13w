import React, { useState, useEffect, useMemo } from "react";
import CashInOutPanel from "../components/CashInOutPanel";
import WalletDashboard from "../components/WalletDashboard";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import KYCModal from "../components/KYCModal";
import { getTransactions, updateKyc } from "../api/api";
import logo from "../assets/logo.svg";

type Transaction = {
  id: number;
  amount: number | string;
  date: string;
  metadata: Record<string, any>;
  type: "Cash In" | "Cash Out" | string;
  user_id: number;
};

const Home: React.FC = () => {
  const { logout, user, token } = useAuth();
  const [balance, setBalance] = useState(0);
  const [showKYCModal, setShowKYCModal] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      toast("Session expired. Logging out...", {
        icon: "⏳",
        style: {
          backgroundColor: "#fbbf24",
          color: "#1f2937",
          fontWeight: "500",
        },
      });
      logout();
    }, 30 * 60 * 1000); //I will change this to 30 after dev

    return () => clearTimeout(timeout);
  }, [logout]);

  useEffect(() => {
    if (user?.iskyccompleted) {
      setShowKYCModal(false);
    } else {
      setShowKYCModal(true);
    }
  }, [user?.iskyccompleted]);

  const fetchTransactions = async () => {
    const data = { token: token, user_id: user?.id };
    const result = await getTransactions(data);

    if (result?.transactions) {
      setTransactions(result?.transactions);
    } else {
      toast.error("No transaction records found");
    }
  };

  useMemo(() => {
    fetchTransactions();
  }, []);

  const handleKYCSubmit = async (data: any) => {
    data.userId = user?.id;

    const result = await updateKyc(data);

    if (result?.message) {
      toast.success("KYC completed successfully! Please login");
      setShowKYCModal(false);
      logout();
    } else {
      toast.error("KYC submission failed.");
      logout();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-center space-x-2 h-16">
          <img src={logo} alt="Kifiya Logo" className="h-12 w-auto" />{" "}
          {/* <h3 className="text-xl font-bold text-[#08313D]">My Kifi-Wallet</h3> */}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#08313D] flex items-center justify-center text-white font-bold">
              {user?.username?.slice(0, 2).toUpperCase()}
            </div>
            <span className="text-sm text-gray-700 font-medium">
              {user?.username ?? "No user"}
            </span>
          </div>
          <button
            onClick={logout}
            className="bg-[#E4681B] hover:bg-[#d45b18] text-white px-4 py-2 rounded-lg text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 p-6 gap-6">
        <div className="w-9/12">
          <WalletDashboard transactions={transactions} balFunc={setBalance} />
        </div>
        <div className="w-3/12">
          <CashInOutPanel
            showKYCModal={showKYCModal}
            onRefresh={fetchTransactions}
            user={user}
            balance={balance}
          />
        </div>
      </div>

      {showKYCModal && <KYCModal onSubmit={handleKYCSubmit} />}
    </div>
  );
};

export default Home;
