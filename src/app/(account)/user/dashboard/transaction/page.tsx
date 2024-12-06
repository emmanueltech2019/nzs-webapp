'use client'
import TagHeader from '@/components/header/TagHeader';
import TransactionCard from './components/TransactionCard';
import TransactionTab from '@/components/tabs/TransactionTab';
import { useEffect, useState } from 'react';
import openSansFont from '@/fonts/OpenSans';
import axios from "@/utils/axios";


interface Transaction {
  id: number; // Assuming each notification has an id; adjust as needed
  totalAmount: number; // Example field; adjust based on actual notification fields
  status: string; // Example field
  createdAt: string;
  paymentReference: string
}

const Transactions = () => {
  const [pendingTransaction, setPendingTransaction] = useState<Transaction[]>([]);
  const [completedTransaction, setCompletedTransaction] = useState<Transaction[]>([]);
  const [failedTransaction, setFailedTransaction] = useState<Transaction[]>([]);

  const initialState = [
    { title: 'Amazing Shoes', location: 'Port Harcourt', timeAgo: '2 hrs ago', id: 0 },
    { title: 'Amazing Shoes', location: 'Port Harcourt', timeAgo: '2 hrs ago', id: 1 },
    { title: 'Amazing Shoes', location: 'Port Harcourt', timeAgo: '2 hrs ago', id: 2 },
    { title: 'Amazing Shoes', location: 'Port Harcourt', timeAgo: '2 hrs ago', id: 3 },
    { title: 'Amazing Shoes', location: 'Port Harcourt', timeAgo: '2 hrs ago', yesterday: true, id: 4 },
    { title: 'Amazing Shoes', location: 'Port Harcourt', timeAgo: '2 hrs ago', id: 5 },
  ];

  useEffect(() => {
    // const userToken = localStorage.getItem("userToken");
    // const tr = userToken ? JSON.parse(userToken) : null;

    axios({
      url: 'users/orders',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }).then((res) => {
      const transactions: Transaction[] = res.data.orders;
      // Separate notifications into read and unread based on isRead
      setPendingTransaction(transactions.filter(transaction => transaction.status=="pending"));
      setCompletedTransaction(transactions.filter(transaction => transaction.status=="completed"));
      setFailedTransaction(transactions.filter(transaction => transaction.status=="failed"));
    }).catch((error) => {
      console.error("Error fetching notifications:", error);
    });
  }, []);
  const [transactions, setTransactions] = useState(initialState)
  const removeTrasaction = (i: number) => {
    const item = transactions[i]
    setTransactions(prev => prev.filter(tr => tr.id !== item.id))
  }
  const [activeTab, setActiveTab] = useState('completed');

  return (
    <div className={`max-w-2xl mx-auto px-4 py-6 ${openSansFont}`}>
      <TagHeader title='My Transactions' />

      <TransactionTab activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab == 'completed' ?
        ( <div>
          {completedTransaction.length > 0 ?<>{completedTransaction.map(({ totalAmount, status, createdAt, paymentReference}, index) => (
            <TransactionCard
            key={index}
            title={`${status} Transaction`}
            location={paymentReference}
            timeAgo={createdAt.split('T')[0]}
            yesterday={true}
            deleteFunc={() => removeTrasaction(index)}
          />
          ))}</>:<><div className='failed'>
          <h1>no completed transaction</h1>
        </div></>}
          
        </div>)
        : activeTab == 'pending' ?
          ( <div>
            {pendingTransaction.length > 0 ?<>{pendingTransaction.map(({ totalAmount, status, createdAt, paymentReference}, index) => (
              <TransactionCard
                key={index}
                title={`${status} Transaction`}
                location={paymentReference}
                timeAgo={createdAt.split('T')[0]}
                yesterday={true}
                deleteFunc={() => removeTrasaction(index)}
              />
            ))}</>:<><div className='pending'>
            <h1>no pending transaction</h1>
          </div></>}
            
          </div>)
          : (
            <div>
              {failedTransaction.length > 0 ?<>{failedTransaction.map(({ totalAmount, status, createdAt, paymentReference}, index) => (
                <TransactionCard
                key={index}
                title={`${status} Transaction`}
                location={paymentReference}
                timeAgo={createdAt.split('T')[0]}
                yesterday={true}
                deleteFunc={() => removeTrasaction(index)}
              />
              ))}</>:<><div className='failed'>
              <h1>no failed transaction</h1>
            </div></>}
              
            </div>
          )}


    </div>
  );
};

export default Transactions;
