import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { HeaderProvider } from './components/HeaderProvider/HeaderProvider.jsx'
import store from './store.js'

ReactDOM.createRoot(document.getElementById("root")).render(
  //<React.StrictMode>
    <Provider store={store}>
      <HeaderProvider>
        <App />
      </HeaderProvider>
    </Provider>
  //</React.StrictMode>
);
