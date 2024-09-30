'use client'
import TagHeader from '@/components/header/TagHeader';
import TransactionCard from './components/TransactionCard';
import TransactionTab from '@/components/tabs/TransactionTab';
import { useState } from 'react';

const Transactions = () => {
  const transactions = [
    { title: 'Amazing Shoes', location: 'Port Harcourt', timeAgo: '2 hrs ago' },
    { title: 'Amazing Shoes', location: 'Port Harcourt', timeAgo: '2 hrs ago' },
    { title: 'Amazing Shoes', location: 'Port Harcourt', timeAgo: '2 hrs ago' },
    { title: 'Amazing Shoes', location: 'Port Harcourt', timeAgo: '2 hrs ago' },
    { title: 'Amazing Shoes', location: 'Port Harcourt', timeAgo: '2 hrs ago', yesterday: true },
    { title: 'Amazing Shoes', location: 'Port Harcourt', timeAgo: '2 hrs ago' },
  ];
  const [activeTab, setActiveTab] = useState('outgoing');

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <TagHeader title='My Transactions'/>
<<<<<<< HEAD
     
      {/* <div className="flex space-x-2 mb-4">
        <button className="bg-green-600 text-white px-4 py-2 rounded-full">Popular</button>
        <button className="bg-gray-100 px-4 py-2 rounded-full">Cost-efficient</button>
        <button className="bg-gray-100 px-4 py-2 rounded-full">Location</button>
        <button className="bg-gray-100 px-4 py-2 rounded-full">Anambra</button>
      </div> */}
      
      <div>
=======

      <TransactionTab activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab == 'incoming' ? 
      (<div>
        <h1>no incoming transaction</h1>
      </div>) 
      : activeTab == 'pending' ? 
      (<div>
        <h1>no pending transaction</h1>
      </div>) 
      : (
        <div>
>>>>>>> 514870276bc79d86360027c985c2f1996f737790
        {transactions.map((transaction, index) => (
          <TransactionCard
            key={index}
            title={transaction.title}
            location={transaction.location}
            timeAgo={transaction.timeAgo}
            yesterday={transaction.yesterday}
          />
        ))}
      </div>
      )}
     
      {/* <div className="flex space-x-2 mb-4">
        <button className="bg-green-600 text-white px-4 py-2 rounded-full">Popular</button>
        <button className="bg-gray-100 px-4 py-2 rounded-full">Cost-efficient</button>
        <button className="bg-gray-100 px-4 py-2 rounded-full">Location</button>
        <button className="bg-gray-100 px-4 py-2 rounded-full">Anambra</button>
      </div> */}
      
    </div>
  );
};

export default Transactions;
