'use client'
import TagHeader from '@/components/header/TagHeader';
import TransactionCard from './components/TransactionCard';
import TransactionTab from '@/components/tabs/TransactionTab';
import { useState } from 'react';
import openSansFont from '@/fonts/OpenSans';

const Transactions = () => {
  const initialState = [
    { title: 'Amazing Shoes', location: 'Port Harcourt', timeAgo: '2 hrs ago', id: 0 },
    { title: 'Amazing Shoes', location: 'Port Harcourt', timeAgo: '2 hrs ago', id: 1 },
    { title: 'Amazing Shoes', location: 'Port Harcourt', timeAgo: '2 hrs ago', id: 2 },
    { title: 'Amazing Shoes', location: 'Port Harcourt', timeAgo: '2 hrs ago', id: 3 },
    { title: 'Amazing Shoes', location: 'Port Harcourt', timeAgo: '2 hrs ago', yesterday: true, id: 4 },
    { title: 'Amazing Shoes', location: 'Port Harcourt', timeAgo: '2 hrs ago', id: 5 },
  ];
  const [transactions, setTransactions] = useState(initialState)
  const removeTrasaction = (i: number) => {
    const item = transactions[i]
    setTransactions(prev => prev.filter(tr => tr.id !== item.id))
  }
  const [activeTab, setActiveTab] = useState('outgoing');

  return (
    <div className={`max-w-2xl mx-auto px-4 py-6 ${openSansFont}`}>
      <TagHeader title='My Transactions' />

      <TransactionTab activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab == 'incoming' ?
        (<div className='incoming'>
          <h1>no incoming transaction</h1>
        </div>)
        : activeTab == 'pending' ?
          (<div className='pending'>
            <h1>no pending transaction</h1>
          </div>)
          : (
            <div>
              {transactions.map(({ title, location, timeAgo, yesterday }, index) => (
                <TransactionCard
                  key={index}
                  title={title}
                  location={location}
                  timeAgo={timeAgo}
                  yesterday={yesterday}
                  deleteFunc={() => removeTrasaction(index)}
                />
              ))}
            </div>
          )}


    </div>
  );
};

export default Transactions;
