import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import Router from 'main/router';
import 'presentation/commons/styles/global.css';
import { i18n } from 'presentation/commons/locale';

import 'normalize.css';

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <header>
        <button>pt-br</button>
        <button>en-us</button>
      </header>
      <main>
        <Router />
      </main>
      <footer>{process.env.REACT_APP_VERSION}</footer>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
