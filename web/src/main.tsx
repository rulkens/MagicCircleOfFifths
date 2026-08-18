import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/App/App';
import { createAppStore } from './store/createAppStore';
import './styles/global.css';

const store = createAppStore();
const container = document.getElementById('root') as HTMLElement;

createRoot(container).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
