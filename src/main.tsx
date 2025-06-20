import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { App } from './App.tsx';
import store from './store/store.ts';
import { SnackbarComponent } from './components/SnackbarComponent.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <SnackbarComponent />
    </Provider>
  </BrowserRouter>
);
