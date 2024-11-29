// WalletInfo.tsx
import React from 'react';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
interface Transaction {
  date: string;
  description: string;
  amount: number;
}

interface WalletInfoProps {
  totalBalance: number;
  transactions: { year: string; month: string; data: Transaction[] }[];
  color: string
}

const WalletInfo: React.FC<WalletInfoProps> = ({ totalBalance, transactions, color }) => {

  return (
    <>
    <div className="p-6 bg-white rounded-lg h-[50vh] overflow-auto">
      {/* Wallet Info Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-gray-600 text-lg p-2">Wallet Info</p>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-yellow-100 text-yellow-500 rounded-full flex items-center justify-center">
              {/* Replace with icon if needed */}
              <span style={{backgroundColor:color,color: 'white', borderRadius: 100, padding: 3 }}>
                <AutorenewOutlinedIcon />
              </span>
            </div>
            <span className="text-sm text-gray-400 px-2">TOTAL</span>
          </div>
        </div>
            <span className="text-2xl font-bold text-gray-800">
              {totalBalance.toLocaleString()}
            </span>
      </div>

      {/* Transaction History */}
      {transactions.map((group, index) => (
        <div key={index} className="mb-4 ">
          {/* Year and Month */}
          <h2 className="text-lg font-bold text-gray-800">{group.year}</h2>
          <div className="flex items-center space-x-2 mb-2">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
              {group.month}
            </span>
          </div>

          {/* Transactions */}
          {group.data.map((transaction, idx) => (
            <div key={idx} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg mb-2">
              <div className="text-sm text-gray-500">{transaction.date}</div>
              <div className="text-sm text-gray-500">{transaction.description}</div>
              <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
                {transaction.amount.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Withdraw Button */}
    </div>
      <button className="w-full bg-green-800 text-white py-3 rounded-full font-semibold mt-4 mb-10">
       ADD TO WALLET
      </button>
    </>
  );
};

export default WalletInfo;
