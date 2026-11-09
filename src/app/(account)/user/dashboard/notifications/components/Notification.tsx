
// 'use client'
// import TagHeader from '@/components/header/TagHeader';
// import NotificationTab from '@/components/tabs/NotificationTab';
// import { useEffect, useState } from 'react';
// import openSansFont from '@/fonts/OpenSans';
// import axios from "@/utils/axios";
// import { AxiosResponse } from 'axios';
// import Swal from 'sweetalert2';

// interface Notification {
//   _id: string; // Assuming each notification has an id; adjust as needed
//   title: string; // Example field; adjust based on actual notification fields
//   message: string; // Example field
//   isRead: boolean;
//   createdAt: string
// }
// interface NotificationResponse {
//   success: boolean;
//   message: string;
//   data?: any; // Replace `any` with the actual type of `data` if known
// }
// const Notifications = () => {
//   const [activeTab, setActiveTab] = useState('Read');
//   const [readNotifications, setReadNotifications] = useState<Notification[]>([]);
//   const [unreadNotifications, setUnreadNotifications] = useState<Notification[]>([]);

//   const markAsRead = async (id: string | number): Promise<void> => {
//     const token = localStorage.getItem("userToken");
  
//     if (!token) {
//       console.error("User token not found in localStorage");
//       return;
//     }
  
//     try {
//       const response: AxiosResponse<NotificationResponse> = await axios({
//         url: `users/notifications/${id}/read`,
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
  
//       console.log("Notification marked as read:", response.data);
//     } catch (error: any) {
//       console.error("Error marking notification as read:", error.response?.data || error.message);
//     }
//   };
//   useEffect(() => {
//     // const userToken = localStorage.getItem("userToken");
//     // const tr = userToken ? JSON.parse(userToken) : null;

//     axios({
//       url: 'users/notifications',
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//       },
//     }).then((res) => {
//       const notifications: Notification[] = res.data.notifications;
//       // Separate notifications into read and unread based on isRead
//       setReadNotifications(notifications.filter(notification => notification.isRead));
//       setUnreadNotifications(notifications.filter(notification => !notification.isRead));
//     }).catch((error) => {
//        if(error.response.data.message==="Unauthorized access"){
//                         Swal.fire({
//                           title: "Session Expired",
//                           text: "Your session has expired. Please log in again.",
//                           icon: "warning",
//                           confirmButtonText: "OK",
//                         }).then(() => {
//                           localStorage.clear();
//                           window.location.replace("/auth/login");
//                         });
//                         return;
//                       }
//       console.error("Error fetching notifications:", error);
//     });
//   }, []);

//   return (
//     <div className={`max-w-2xl mx-auto px-4 py-6 ${openSansFont}`}>
//       <TagHeader title='Notification' />

//       <NotificationTab activeTab={activeTab} setActiveTab={setActiveTab} />

//       {activeTab === 'Read' ? (
//         <div className='Read'>
//           {readNotifications.length > 0 ? (
//             readNotifications.map((notification) => (
//               <div key={notification._id} className="notification-item border py-4 px-2 my-2 rounded-lg">
//                 <h2 className='font-bold'>{notification.createdAt.split('T')[1]} - {notification.createdAt.split('T')[0]}</h2>
//                 <p className=''>{notification.message}</p>
//                 {/* <hr/> */}
//               </div>
//             ))
//           ) : (
//             <h1>No read notifications</h1>
//           )}
//         </div>
//       ) : (
//         <div className='Unread'>
//           {unreadNotifications.length > 0 ? (
//             unreadNotifications.map((notification) => (
//               <div key={notification._id} className="notification-item border py-4 px-2 my-2 rounded-lg" onClick={()=>markAsRead(notification._id)}>
//                 <h2 className='font-bold'>{notification.createdAt.split('T')[1]} - {notification.createdAt.split('T')[0]}</h2>
//                 <p className=''>{notification.message}</p>
//                 {/* <hr/> */}
//               </div>
//             ))
//           ) : (
//             <h1>No unread notifications</h1>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Notifications;
"use client";

import React, {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";

import TagHeader from "@/components/header/TagHeader";
import NotificationTab from "@/components/tabs/NotificationTab";
import CircleLoader from "@/components/loader/loader";

import axios from "@/utils/axios";
import Swal from "sweetalert2";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import MarkEmailReadRoundedIcon from "@mui/icons-material/MarkEmailReadRounded";

import openSansFont from "@/fonts/OpenSans";

interface Notification {
  _id: string;
  title?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface NotificationsResponse {
  success?: boolean;
  message?: string;
  notifications?: Notification[];
  data?: Notification[];
}

type NotificationTabType = "Read" | "Unread";

/* -------------------------------------------------------------------------- */
/*                                HELPERS                                     */
/* -------------------------------------------------------------------------- */

const formatNotificationDate = (date?: string) => {
  if (!date) {
    return "Date unavailable";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(parsedDate);
};

const getRelativeTime = (date?: string) => {
  if (!date) {
    return "";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  const difference =
    Date.now() - parsedDate.getTime();

  if (difference < 0) {
    return "Just now";
  }

  const seconds = Math.floor(
    difference / 1000
  );

  if (seconds < 60) {
    return "Just now";
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return `${days}d ago`;
  }

  const weeks = Math.floor(days / 7);

  if (weeks < 5) {
    return `${weeks}w ago`;
  }

  return formatNotificationDate(date);
};

/* -------------------------------------------------------------------------- */
/*                           NOTIFICATION SKELETON                            */
/* -------------------------------------------------------------------------- */

const NotificationSkeleton = () => {
  return (
    <div className="mt-5 space-y-3">
      {Array.from({ length: 6 }).map(
        (_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-100 bg-white p-4"
          >
            <div className="flex gap-3">
              <div className="h-11 w-11 animate-pulse rounded-xl bg-gray-100" />

              <div className="min-w-0 flex-1 space-y-3">
                <div className="flex justify-between gap-4">
                  <div className="h-4 w-40 animate-pulse rounded bg-gray-100" />
                  <div className="h-3 w-14 animate-pulse rounded bg-gray-100" />
                </div>

                <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                            EMPTY STATE                                     */
/* -------------------------------------------------------------------------- */

const EmptyNotifications = ({
  activeTab,
  searchQuery,
  clearSearch,
}: {
  activeTab: NotificationTabType;
  searchQuery: string;
  clearSearch: () => void;
}) => {
  const isSearching = searchQuery.trim().length > 0;

  return (
    <div className="mt-5 flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-20 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#006838]/10 text-[#006838]">
        {isSearching ? (
          <SearchRoundedIcon sx={{ fontSize: 36 }} />
        ) : (
          <NotificationsNoneRoundedIcon
            sx={{ fontSize: 36 }}
          />
        )}
      </div>

      <h2 className="mt-5 text-xl font-black tracking-tight text-gray-900">
        {isSearching
          ? "No matching notifications"
          : activeTab === "Unread"
          ? "You're all caught up"
          : "No read notifications"}
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
        {isSearching
          ? `We couldn't find a notification matching "${searchQuery}".`
          : activeTab === "Unread"
          ? "You don't have any unread notifications right now."
          : "Notifications that you've already read will appear here."}
      </p>

      {isSearching && (
        <button
          type="button"
          onClick={clearSearch}
          className="mt-5 rounded-xl bg-[#006838] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#00542d]"
        >
          Clear search
        </button>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                         NOTIFICATION CARD                                  */
/* -------------------------------------------------------------------------- */

interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  markingId: string | null;
}

const NotificationCard = ({
  notification,
  onMarkAsRead,
  markingId,
}: NotificationCardProps) => {
  const isMarking =
    markingId === notification._id;

  return (
    <article
      className={`
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        bg-white
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:shadow-md
        ${
          notification.isRead
            ? "border-gray-200"
            : "border-[#006838]/20 bg-[#fbfffc]"
        }
      `}
    >
      {/* Unread indicator */}

      {!notification.isRead && (
        <span className="absolute left-0 top-0 h-full w-1 bg-[#006838]" />
      )}

      <div className="flex gap-3 p-4 sm:p-5">
        {/* Icon */}

        <div
          className={`
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            ${
              notification.isRead
                ? "bg-gray-100 text-gray-400"
                : "bg-[#006838]/10 text-[#006838]"
            }
          `}
        >
          {notification.isRead ? (
            <NotificationsNoneRoundedIcon
              sx={{ fontSize: 20 }}
            />
          ) : (
            <NotificationsActiveRoundedIcon
              sx={{ fontSize: 20 }}
            />
          )}
        </div>

        {/* Content */}

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="truncate text-sm font-bold text-gray-900 sm:text-base">
                  {notification.title ||
                    "Notification"}
                </h2>

                {!notification.isRead && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#006838]/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#006838]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#006838]" />
                    New
                  </span>
                )}
              </div>

              <p className="mt-1 text-xs text-gray-400">
                {getRelativeTime(
                  notification.createdAt
                )}
              </p>
            </div>

            <p className="hidden shrink-0 text-[10px] text-gray-400 sm:block">
              {formatNotificationDate(
                notification.createdAt
              )}
            </p>
          </div>

          <p
            className={`mt-3 text-sm leading-6 ${
              notification.isRead
                ? "text-gray-500"
                : "font-medium text-gray-700"
            }`}
          >
            {notification.message}
          </p>

          {!notification.isRead && (
            <button
              type="button"
              onClick={() =>
                onMarkAsRead(
                  notification._id
                )
              }
              disabled={isMarking}
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[#006838]/20 bg-[#006838]/5 px-3 py-2 text-xs font-semibold text-[#006838] transition hover:bg-[#006838]/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isMarking ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#006838]/20 border-t-[#006838]" />
                  Marking as read...
                </>
              ) : (
                <>
                  <DoneRoundedIcon
                    sx={{ fontSize: 15 }}
                  />
                  Mark as read
                </>
              )}
            </button>
          )}

          {notification.isRead && (
            <div className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-gray-400">
              <MarkEmailReadRoundedIcon
                sx={{ fontSize: 14 }}
              />
              Read
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

/* -------------------------------------------------------------------------- */
/*                              PAGE                                          */
/* -------------------------------------------------------------------------- */

const Notifications = () => {
  const [activeTab, setActiveTab] =
    useState<NotificationTabType>("Read");

  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState("");

  const [searchQuery, setSearchQuery] =
    useState("");

  const deferredSearchQuery =
    useDeferredValue(searchQuery);

  const [markingId, setMarkingId] =
    useState<string | null>(null);

  /* ------------------------------------------------------------------------ */
  /*                              FETCH                                       */
  /* ------------------------------------------------------------------------ */

  const fetchNotifications = useCallback(
    async (showRefresh = false) => {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("userToken")
          : null;

      if (!token) {
        window.location.replace(
          "/auth/login"
        );
        return;
      }

      try {
        if (showRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

        const response =
          await axios.get<NotificationsResponse>(
            "users/notifications",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        const data =
          response?.data;

        const fetchedNotifications =
          Array.isArray(
            data?.notifications
          )
            ? data.notifications
            : Array.isArray(data?.data)
            ? data.data
            : [];

        setNotifications(
          fetchedNotifications
        );
      } catch (error: any) {
        console.error(
          "Error fetching notifications:",
          error
        );

        const status =
          error?.response?.status;

        const message =
          error?.response?.data?.message;

        if (
          status === 401 ||
          message === "Unauthorized access"
        ) {
          await Swal.fire({
            title: "Session Expired",
            text: "Your session has expired. Please log in again.",
            icon: "warning",
            confirmButtonText: "Log In",
            confirmButtonColor: "#006838",
            allowOutsideClick: false,
          });

          localStorage.removeItem(
            "userToken"
          );

          window.location.replace(
            "/auth/login"
          );

          return;
        }

        setError(
          "We couldn't load your notifications right now. Please try again."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  /* ------------------------------------------------------------------------ */
  /*                              COUNTS                                      */
  /* ------------------------------------------------------------------------ */

  const unreadCount = useMemo(
    () =>
      notifications.filter(
        (notification) =>
          !notification.isRead
      ).length,
    [notifications]
  );

  const readCount = useMemo(
    () =>
      notifications.filter(
        (notification) =>
          notification.isRead
      ).length,
    [notifications]
  );

  /* ------------------------------------------------------------------------ */
  /*                         ACTIVE NOTIFICATIONS                              */
  /* ------------------------------------------------------------------------ */

  const activeNotifications = useMemo(() => {
    const filteredByTab =
      notifications.filter(
        (notification) =>
          activeTab === "Read"
            ? notification.isRead
            : !notification.isRead
      );

    const query =
      deferredSearchQuery
        .toLowerCase()
        .trim();

    if (!query) {
      return filteredByTab;
    }

    return filteredByTab.filter(
      (notification) => {
        const title =
          notification.title
            ?.toLowerCase()
            .trim() || "";

        const message =
          notification.message
            ?.toLowerCase()
            .trim() || "";

        return (
          title.includes(query) ||
          message.includes(query)
        );
      }
    );
  }, [
    notifications,
    activeTab,
    deferredSearchQuery,
  ]);

  /* ------------------------------------------------------------------------ */
  /*                          MARK AS READ                                     */
  /* ------------------------------------------------------------------------ */

  const markAsRead = async (id: string) => {
    if (markingId) {
      return;
    }

    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("userToken")
        : null;

    if (!token) {
      window.location.replace(
        "/auth/login"
      );
      return;
    }

    const notification =
      notifications.find(
        (item) => item._id === id
      );

    if (!notification || notification.isRead) {
      return;
    }

    /*
     * Optimistic UI:
     * Mark it read immediately so the interface
     * feels responsive.
     */
    setNotifications((current) =>
      current.map((item) =>
        item._id === id
          ? {
              ...item,
              isRead: true,
            }
          : item
      )
    );

    setMarkingId(id);

    try {
      await axios.put(
        `users/notifications/${encodeURIComponent(
          id
        )}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error: any) {
      console.error(
        "Error marking notification as read:",
        error
      );

      /*
       * Revert optimistic update if the
       * server request fails.
       */
      setNotifications((current) =>
        current.map((item) =>
          item._id === id
            ? {
                ...item,
                isRead: false,
              }
            : item
        )
      );

      const status =
        error?.response?.status;

      const message =
        error?.response?.data?.message;

      if (
        status === 401 ||
        message === "Unauthorized access"
      ) {
        localStorage.removeItem(
          "userToken"
        );

        window.location.replace(
          "/auth/login"
        );

        return;
      }

      Swal.fire({
        toast: true,
        position: "top-end",
        timer: 2500,
        showConfirmButton: false,
        icon: "error",
        title: "Could not mark notification as read",
      });
    } finally {
      setMarkingId(null);
    }
  };

  /* ------------------------------------------------------------------------ */
  /*                            CLEAR SEARCH                                  */
  /* ------------------------------------------------------------------------ */

  const clearSearch = () => {
    setSearchQuery("");
  };

  /* ------------------------------------------------------------------------ */
  /*                              RENDER                                      */
  /* ------------------------------------------------------------------------ */

  return (
    <main
      className={`min-h-screen bg-[#f7f9f8] px-4 py-5 md:px-6 md:py-8 ${openSansFont}`}
    >
      <div className="mx-auto w-full max-w-3xl">
        {/* ---------------------------------------------------------------- */}
        {/* HEADER                                                           */}
        {/* ---------------------------------------------------------------- */}

        <TagHeader title="Notification" />

        <section className="mt-5 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="relative overflow-hidden bg-gradient-to-br from-[#063c25] via-[#006838] to-[#074c2d] p-5 sm:p-6">
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

            <div className="relative flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-white/60">
                  <NotificationsActiveRoundedIcon
                    sx={{ fontSize: 18 }}
                  />

                  <span className="text-[10px] font-bold uppercase tracking-[0.16em]">
                    Account activity
                  </span>
                </div>

                <h1 className="mt-2 text-2xl font-black tracking-tight text-white">
                  Notifications
                </h1>

                <p className="mt-2 max-w-lg text-sm leading-6 text-white/65">
                  Stay updated with important activity
                  and account updates.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  fetchNotifications(true)
                }
                disabled={refreshing}
                aria-label="Refresh notifications"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur transition hover:bg-white/20 disabled:opacity-50"
              >
                <RefreshRoundedIcon
                  className={
                    refreshing
                      ? "animate-spin"
                      : ""
                  }
                />
              </button>
            </div>

            {/* Header stats */}

            <div className="relative mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <p className="text-[10px] uppercase tracking-wider text-white/45">
                  Unread
                </p>

                <p className="mt-1 text-2xl font-black text-white">
                  {unreadCount}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <p className="text-[10px] uppercase tracking-wider text-white/45">
                  Total
                </p>

                <p className="mt-1 text-2xl font-black text-white">
                  {notifications.length}
                </p>
              </div>
            </div>
          </div>

          {/* Tab summary */}

          <div className="grid grid-cols-2 border-t border-gray-100">
            <button
              type="button"
              onClick={() =>
                setActiveTab("Read")
              }
              className={`p-4 text-left transition ${
                activeTab === "Read"
                  ? "bg-gray-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <MarkEmailReadRoundedIcon
                  sx={{
                    fontSize: 17,
                    color:
                      activeTab === "Read"
                        ? "#006838"
                        : "#9ca3af",
                  }}
                />

                <span className="text-xs font-semibold text-gray-500">
                  Read
                </span>
              </div>

              <p className="mt-1 text-xl font-black text-gray-900">
                {readCount}
              </p>
            </button>

            <button
              type="button"
              onClick={() =>
                setActiveTab("Unread")
              }
              className={`border-l border-gray-100 p-4 text-left transition ${
                activeTab === "Unread"
                  ? "bg-[#006838]/5"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <NotificationsActiveRoundedIcon
                  sx={{
                    fontSize: 17,
                    color:
                      activeTab ===
                      "Unread"
                        ? "#006838"
                        : "#9ca3af",
                  }}
                />

                <span className="text-xs font-semibold text-gray-500">
                  Unread
                </span>
              </div>

              <p className="mt-1 text-xl font-black text-gray-900">
                {unreadCount}
              </p>
            </button>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* EXISTING TAB COMPONENT                                           */}
        {/* ---------------------------------------------------------------- */}

        <div className="mt-5">
          <NotificationTab
            activeTab={activeTab}
            // setActiveTab={setActiveTab}
            setActiveTab={(tab) => setActiveTab(tab as NotificationTabType)}
          />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* SEARCH                                                           */}
        {/* ---------------------------------------------------------------- */}

        {!loading &&
          !error &&
          notifications.length > 0 && (
            <div className="relative mt-4">
              <SearchRoundedIcon
                sx={{
                  fontSize: 20,
                  color: "#9ca3af",
                }}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
              />

              <input
                type="search"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(
                    event.target.value
                  )
                }
                placeholder={`Search ${activeTab.toLowerCase()} notifications...`}
                autoComplete="off"
                className="h-12 w-full rounded-2xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#006838] focus:ring-4 focus:ring-[#006838]/5"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200"
                >
                  ×
                </button>
              )}
            </div>
          )}

        {/* ---------------------------------------------------------------- */}
        {/* CONTENT                                                          */}
        {/* ---------------------------------------------------------------- */}

        {loading ? (
          <>
            <div className="mt-5">
              <CircleLoader isVisible={loading} />
            </div>

            <NotificationSkeleton />
          </>
        ) : error ? (
          <div className="mt-5 rounded-3xl border border-red-100 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <NotificationsNoneRoundedIcon
                sx={{ fontSize: 30 }}
              />
            </div>

            <h2 className="mt-5 text-xl font-black text-gray-900">
              Notifications unavailable
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                fetchNotifications()
              }
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#006838] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#00542d]"
            >
              <RefreshRoundedIcon
                sx={{ fontSize: 18 }}
              />

              Try again
            </button>
          </div>
        ) : activeNotifications.length > 0 ? (
          <section className="mt-5 space-y-3 pb-10">
            <div className="flex items-center justify-between px-1">
              <p className="text-xs font-bold uppercase tracking-[0.13em] text-gray-400">
                {activeTab} notifications
              </p>

              <p className="text-xs font-medium text-gray-400">
                {activeNotifications.length}{" "}
                {activeNotifications.length ===
                1
                  ? "notification"
                  : "notifications"}
              </p>
            </div>

            {activeNotifications.map(
              (notification) => (
                <NotificationCard
                  key={notification._id}
                  notification={notification}
                  onMarkAsRead={markAsRead}
                  markingId={markingId}
                />
              )
            )}
          </section>
        ) : (
          <EmptyNotifications
            activeTab={activeTab}
            searchQuery={searchQuery}
            clearSearch={clearSearch}
          />
        )}
      </div>
    </main>
  );
};

export default Notifications;