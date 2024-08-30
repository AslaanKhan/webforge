"use client";
import { NotificationWithUser } from "@/lib/types";
import React, { createContext, useContext, useEffect } from "react";

interface ModalProviderProps {
  children: React.ReactNode;
}

type GlobalContextType = {
  notifications: NotificationWithUser | [];
  setNotifications: (notification : any, fetchData?: () => Promise<any>) => void;
};

export const GlobalContext = createContext<GlobalContextType | null>(null);

const GlobalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = React.useState<NotificationWithUser | []>([]);
  const [isMounted, setIsMounted] = React.useState(false);


  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <GlobalContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within the modal provider");
  }
  return context;
};

export default GlobalProvider;
