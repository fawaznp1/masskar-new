import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from '../components/common/Layout'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import AuthForm from '../components/common/Login'
import About from '../pages/About'
import DeliveryLocations from '../pages/Delivery Locations'
import CookieConsent from '../components/common/Cookies'
import HomePage from '../components/common/Layout'
import { CartProvider } from '../components/cart/CartContext'

function AppRoutes() {
  return (
    <div>
        <CartProvider>
          <Header />
         {/*  comment only for live        <CookieConsent /> */}
              <Routes>
          <Route path="*" element={<Navigate to="/category/fish" />} />
              <Route path='/login' element={<AuthForm />}></Route>
                          <Route path='/about' element={<About />}></Route>
              <Route path='/locations' element={<DeliveryLocations />}></Route>
                      <Route path="/category/:type" element={<HomePage />} />
          
          
          </Routes>
          <Footer />
        </CartProvider>
    </div>
  )
}

export default AppRoutes