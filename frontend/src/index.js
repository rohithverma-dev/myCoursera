import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';

import { ChakraProvider , theme } from '@chakra-ui/react';
import {Provider as ReduxProvider } from "react-redux"
import store from './redux/store';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  // StrictMode kabhi bhi mat hatana - nhi to deployment ke time p kaam nhi karegi website , production ke time pe karegi but deployment ke baad p nhi
  <StrictMode>     
    <ReduxProvider store={store}>
    <ChakraProvider theme={theme} >
      <App />
    </ChakraProvider>
    </ReduxProvider>
  </StrictMode>
);


