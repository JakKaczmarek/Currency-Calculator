import React, { createContext, useContext, useState, ReactNode } from "react";

interface HistoryContextProps {
  transactions: string[];
  addToHistory: (transaction: string) => void;
  clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextProps | undefined>(
  undefined
);

export const HistoryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<string[]>([]);

  const addToHistory = (transaction: string) => {
    setTransactions((prevTransactions) => [transaction, ...prevTransactions]);
  };
  const clearHistory = () => {
    setTransactions([]);
  };
  return (
    <HistoryContext.Provider
      value={{ transactions, addToHistory, clearHistory }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error("useHistory must be used within a HistoryProvider");
  }
  return context;
};
