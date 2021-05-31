import { useState } from 'react';

import GlobalContext from './globalContext';

const StoreProvider = ({ children }) => {
  const [value, setValue] = useState(null);

  return (
    <GlobalContext.Provider value={{ value, setValue }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { StoreProvider };
