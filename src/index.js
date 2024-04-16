import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Home } from './components/home';
import { About } from './components/about';
import { Contact } from './components/contact';
import { PageNotFound } from './components/pageNotFound';
import { RestaurantMenu } from './components/restaurantMenu';
import { Provider } from 'react-redux';
import { appStore } from './utils/appStore';
import { Cart } from './components/cart';

const LazyGrocery = lazy(() => import('./components/grocery'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={appStore}>
    <React.StrictMode> 
      <BrowserRouter> 
          <Routes>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={<App />}>
              <Route path="/" element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="contact-us" element={<Contact />} />
              <Route path="restaurants/:resId" element={<RestaurantMenu />} />
              <Route path="/grocery" element={<Suspense fallback={<div>Loading...</div>}><LazyGrocery /></Suspense> } />
              <Route path="cart" element={<Cart />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </React.StrictMode>
  </Provider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
