import { useState } from 'react';

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState('Profile');

  return (
    <div className="flex border-b border-gray-200 mb-4">
      {['Profile', 'Specialties', 'Appointments'].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`flex-1 text-center py-2 ${
            activeTab === tab ? 'text-black border-b-2 border-green-500' : 'text-gray-500'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
