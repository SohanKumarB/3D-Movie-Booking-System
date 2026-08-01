import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: 'alex_cinephile',
    fullName: 'Alex Vance',
    email: 'alex@movieverse.com',
    role: 'ROLE_USER', // ROLE_USER or ROLE_ADMIN
    rewardPoints: 240,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  });

  const [savedTickets, setSavedTickets] = useState([]);

  const loginAsUser = () => {
    setUser({
      username: 'alex_cinephile',
      fullName: 'Alex Vance',
      email: 'alex@movieverse.com',
      role: 'ROLE_USER',
      rewardPoints: 240,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    });
  };

  const loginAsAdmin = () => {
    setUser({
      username: 'admin_master',
      fullName: 'Cinema Director (Admin)',
      email: 'admin@movieverse.com',
      role: 'ROLE_ADMIN',
      rewardPoints: 9999,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    });
  };

  const addTicketToHistory = (ticket) => {
    setSavedTickets(prev => [ticket, ...prev]);
    // award loyalty points
    setUser(prev => ({ ...prev, rewardPoints: prev.rewardPoints + 50 }));
  };

  return (
    <AuthContext.Provider value={{ user, loginAsUser, loginAsAdmin, savedTickets, addTicketToHistory }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
