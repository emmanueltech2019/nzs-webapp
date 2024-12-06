
'use client'
import TagHeader from '@/components/header/TagHeader';
import NotificationTab from '@/components/tabs/NotificationTab';
import { useEffect, useState } from 'react';
import openSansFont from '@/fonts/OpenSans';
import axios from "@/utils/axios";
import { AxiosResponse } from 'axios';

interface Notification {
  _id: string; // Assuming each notification has an id; adjust as needed
  title: string; // Example field; adjust based on actual notification fields
  message: string; // Example field
  isRead: boolean;
  createdAt: string
}
interface NotificationResponse {
  success: boolean;
  message: string;
  data?: any; // Replace `any` with the actual type of `data` if known
}
const Notifications = () => {
  const [activeTab, setActiveTab] = useState('Read');
  const [readNotifications, setReadNotifications] = useState<Notification[]>([]);
  const [unreadNotifications, setUnreadNotifications] = useState<Notification[]>([]);

  const markAsRead = async (id: string | number): Promise<void> => {
    const token = localStorage.getItem("userToken");
  
    if (!token) {
      console.error("User token not found in localStorage");
      return;
    }
  
    try {
      const response: AxiosResponse<NotificationResponse> = await axios({
        url: `users/notifications/${id}/read`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("Notification marked as read:", response.data);
    } catch (error: any) {
      console.error("Error marking notification as read:", error.response?.data || error.message);
    }
  };
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
              <div key={notification._id} className="notification-item border py-4 px-2 my-2 rounded-lg">
                <h2 className='font-bold'>{notification.createdAt.split('T')[1]} - {notification.createdAt.split('T')[0]}</h2>
                <p className=''>{notification.message}</p>
                {/* <hr/> */}
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
              <div key={notification._id} className="notification-item border py-4 px-2 my-2 rounded-lg" onClick={()=>markAsRead(notification._id)}>
                <h2 className='font-bold'>{notification.createdAt.split('T')[1]} - {notification.createdAt.split('T')[0]}</h2>
                <p className=''>{notification.message}</p>
                {/* <hr/> */}
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
