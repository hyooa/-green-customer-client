import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
                          // 예전버전 선 없애기
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import rootReducer from './modules';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

// 💛 redux > Store, Middleware, thunk
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
console.log(store.getState()); // store 어떻게 관리되는지 확인
// customers:
  // addCustomer:
    // c_add: ""
    // c_adddetail: ""
    // c_gender: ""
    // c_name: ""
    // c_phone: ""
  // customers:
    // data: null
    // error: null
    // loading: false

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
