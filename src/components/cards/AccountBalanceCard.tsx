// AccountBalanceCard.tsx
import Link from 'next/link';
import React from 'react';

interface AccountBalanceCardProps {
  color: string;
  value: number;
}

const AccountBalanceCard: React.FC<AccountBalanceCardProps> = ({ color, value }) => {
  return (
    <div className={`p-4 rounded-lg ${color} text-white flex justify-between items-center`}>
      {/* Left Side with Balance Info */}
      <div>
        <p className="text-sm text-gray-200">Balance</p>
        <h2 className="text-2xl font-bold py-2">₦{value.toLocaleString()}</h2>
        <p className="text-sm text-gray-300 py-2 flex items-center">
          <span className="mr-1">📈</span>
          No recent addition
        </p>
      </div>

      {/* Right Side with Edit Account Button */}
      <Link href={'./wallet/edit-account'}>
      <button className="bg-white text-green-800 px-4 py-1 rounded-full font-semibold flex items-center">
        EDIT ACCOUNT <span className="ml-2">→</span>
      </button>
      </Link>
    </div>
  );
};

export default AccountBalanceCard;
