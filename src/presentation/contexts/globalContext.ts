import { createContext } from 'react';

import { GlobalContextData } from './globalContextData';
import { GlobalContextDefaultValue } from './globalContextDefaultValue';

const GlobalContext = createContext<GlobalContextData>(
  GlobalContextDefaultValue,
);

export default GlobalContext;
