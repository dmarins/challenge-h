import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import 'normalize.css';
import Router from 'main/router';
import 'presentation/commons/styles/global.css';
import { i18n } from 'presentation/commons/locale';
import { SelectLanguage } from 'presentation/components/SelectLanguage/SelectLanguage';
import { StoreProvider } from 'presentation/contexts/storeProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <StoreProvider>
        <header>
          <SelectLanguage />
        </header>
        <main>
          <Router />
          <ToastContainer />
        </main>
        <footer>{process.env.REACT_APP_VERSION}</footer>
      </StoreProvider>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
