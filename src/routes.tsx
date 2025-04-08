import { Routes, Route } from 'react-router'
import { lazy } from 'react'

// Layout
const MainLayout = lazy(() => import('./layouts/main-layout'))
const AuthLayout = lazy(() => import('./layouts/auth-layout'))

// Auth
const Login = lazy(() => import('./pages/login'))
const Register = lazy(() => import('./pages/register'))

// Destination
const DestinationPage = lazy(() => import('./pages/destination'))
const AddDestinationPage = lazy(() => import('./pages/destination/add'))
const EditDestinationPage = lazy(() => import('./pages/destination/[id]/edit'))

// Vacation
const VacationPage = lazy(() => import('./pages/vacation'))
const AddVacationPage = lazy(() => import('./pages/vacation/add'))
const EditVacationPage = lazy(() => import('./pages/vacation/[id]/edit'))

// User
const UserPage = lazy(() => import('./pages/user'))
const AddUserPage = lazy(() => import('./pages/user/add'))
const EditUserPage = lazy(() => import('./pages/user/[id]/edit'))

// Booking
const BookingPage = lazy(() => import('./pages/booking'))
const AddBookingPage = lazy(() => import('./pages/booking/add'))
const EditBookingPage = lazy(() => import('./pages/booking/[id]/edit'))

const Router = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Login */}
        <Route path='auth/login' element={<Login />} />
        {/* Register */}
        <Route path='auth/register' element={<Register />} />
        {/* Layout with sidebar */}
        <Route element={<AuthLayout />}>
          {/* Destination */}
          <Route index element={<DestinationPage />} />
          <Route path='/destination/add' element={<AddDestinationPage />} />
          <Route path='/destination/:id/edit' element={<EditDestinationPage />} />
          {/* Vacation */}
          <Route path='/vacation' element={<VacationPage />} />
          <Route path='/vacation/add' element={<AddVacationPage />} />
          <Route path='/vacation/:id/edit' element={<EditVacationPage />} />
          {/* User */}
          <Route path='/user' element={<UserPage />} />
          <Route path='/user/add' element={<AddUserPage />} />
          <Route path='/user/:id/edit' element={<EditUserPage />} />
          {/* Booking */}
          <Route path='/booking' element={<BookingPage />} />
          <Route path='/booking/add' element={<AddBookingPage />} />
          <Route path='/booking/:id/edit' element={<EditBookingPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default Router
