import React, { useEffect } from "react";
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
} from "react-icons/io5";

type Props = {
  transactions: any;
  balFunc: any;
};

const WalletDashboard = ({ transactions, balFunc }: Props) => {
  const balance = transactions.reduce((total: any, tx: any) => {
    const amount = parseFloat(tx.amount);
    if (tx.type === "Cash In") {
      return total + amount;
    } else if (tx.type === "Cash Out") {
      return total - amount;
    }

    return total;
  }, 0);

  useEffect(() => {
    balFunc(balance);
  }, [balance, balFunc]);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold text-[#08313D] mb-4">
        My KifiWallet Overview
      </h2>
      <div className="text-3xl font-bold text-[#E4681B] mb-6">
        Balance: ${balance}
      </div>

      <h3 className="text-md font-semibold text-gray-700 mb-2">
        Transaction History
      </h3>
      <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-[#08313D] text-white">
          <tr>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-left">Amount (USD)</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx: any) => {
            const isCashIn = tx.type === "Cash In";
            const amountColor = isCashIn ? "text-green-600" : "text-[#E4681B]";
            const Icon = isCashIn
              ? IoArrowUpCircleOutline
              : IoArrowDownCircleOutline;
            const iconColor = isCashIn ? "text-green-500" : "text-[#E4681B]";

            return (
              <tr key={tx.id} className="border-t border-gray-200">
                <td className="px-4 py-2">
                  {new Date(tx.date).toLocaleString()}
                </td>
                <td className="px-4 py-2 flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${iconColor}`} />
                  <span>{tx.type}</span>
                </td>
                <td className={`px-4 py-2 font-semibold ${amountColor}`}>
                  ${parseInt(tx.amount).toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default WalletDashboard;
