import React, { useState } from 'react';
import io from 'socket.io-client';

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const socket = io('ws://localhost:5000', { transports: ['websocket'] });
  const [DTCs, setDTCs] = useState([]);

  return (
    <AppContext.Provider value={{ socket, DTCs, setDTCs }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
