
'use client'
import TagHeader from '@/components/header/TagHeader';
import NotificationTab from '@/components/tabs/NotificationTab';
import { useEffect, useState } from 'react';
import openSansFont from '@/fonts/OpenSans';
import axios from "@/utils/axios";

interface Notification {
  id: number; // Assuming each notification has an id; adjust as needed
  title: string; // Example field; adjust based on actual notification fields
  message: string; // Example field
  isRead: boolean;
}

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('Read');
  const [readNotifications, setReadNotifications] = useState<Notification[]>([]);
  const [unreadNotifications, setUnreadNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // const userToken = localStorage.getItem("userToken");
    // const tr = userToken ? JSON.parse(userToken) : null;

    axios({
      url: 'users/notifications',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }).then((res) => {
      const notifications: Notification[] = res.data.notifications;
      // Separate notifications into read and unread based on isRead
      setReadNotifications(notifications.filter(notification => notification.isRead));
      setUnreadNotifications(notifications.filter(notification => !notification.isRead));
    }).catch((error) => {
      console.error("Error fetching notifications:", error);
    });
  }, []);

  return (
    <div className={`max-w-2xl mx-auto px-4 py-6 ${openSansFont}`}>
      <TagHeader title='Notification' />

      <NotificationTab activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'Read' ? (
        <div className='Read'>
          {readNotifications.length > 0 ? (
            readNotifications.map((notification) => (
              <div key={notification.id} className="notification-item border-1 border-b py-5 flex">
                <div>
                    <h2 className='font-bold text-[19px]'>Transaction Title</h2>
                    <p>{notification.message}</p>
                </div>
                <p className='bg-[#ddd] p-1 h-fit text-center w-[100px] mx-10 rounded'>
                    3 mins
                </p>
                
              </div>
            ))
          ) : (
            <h1>No read notifications</h1>
          )}
        </div>
      ) : (
        <div className='Unread'>
          {unreadNotifications.length > 0 ? (
            unreadNotifications.map((notification) => (
              <div key={notification.id} className="notification-item border-1 border-b">
                <h2 className='bold'>Transaction Title</h2>
                <p>{notification.message}</p>
                <hr/>
              </div>
            ))
          ) : (
            <h1>No unread notifications</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
