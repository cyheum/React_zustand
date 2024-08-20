// import './sentry.instrument';

import ReactDOM from 'react-dom/client';

import App from './App';

const root = document.getElementById('root') as Element;

ReactDOM.createRoot(root).render(
  <>
    <App />
    <div id="myportal" />
  </>
);
