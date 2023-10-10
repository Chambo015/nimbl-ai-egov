'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type DataType = { id: number; name: string }[];

interface DataContextProps {
  data: DataType | null;
  setData: React.Dispatch<React.SetStateAction<DataType | null>>;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  // Check localStorage for initial data
  const initialData = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('data') || 'null') : null;
  const [data, setData] = useState<DataType | null>(initialData);

  // Update localStorage whenever data changes
  useEffect(() => {
    if (typeof window !== 'undefined' && data !== null) {
      localStorage.setItem('data', JSON.stringify(data));
    }
  }, [data]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextProps => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
