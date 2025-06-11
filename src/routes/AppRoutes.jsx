import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../components/common/Layout'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import AuthForm from '../components/common/Login'
import About from '../pages/About'
import DeliveryLocations from '../pages/Delivery Locations'
import CookieConsent from '../components/common/Cookies'

function AppRoutes() {
  return (
    <div>
        <Header />
{/*  uncomment only for live        <CookieConsent />
 */}        <Routes>
            <Route path='/' element={<Layout />}></Route>
            <Route path='/login' element={<AuthForm />}></Route>
                        <Route path='/about' element={<About />}></Route>
            <Route path='/locations' element={<DeliveryLocations />}></Route>

        </Routes>
        <Footer />
    </div>
  )
}

export default AppRoutes