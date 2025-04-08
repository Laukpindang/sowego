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
        <Route index element={<Login />} />
        <Route path='auth/login' element={<Login />} />

        {/* Register */}
        <Route path='auth/register' element={<Register />} />

        {/* Layout with sidebar */}
        <Route element={<AuthLayout />}>
          {/* Destination */}
          <Route path='/destination'>
            <Route index element={<DestinationPage />} />
            <Route path='add' element={<AddDestinationPage />} />
            <Route path=':id/edit' element={<EditDestinationPage />} />
          </Route>

          {/* Vacation */}
          <Route path='/vacation'>
            <Route index element={<VacationPage />} />
            <Route path='add' element={<AddVacationPage />} />
            <Route path=':id/edit' element={<EditVacationPage />} />
          </Route>

          {/* User */}
          <Route path='/user'>
            <Route index element={<UserPage />} />
            <Route path='add' element={<AddUserPage />} />
            <Route path=':id/edit' element={<EditUserPage />} />
          </Route>

          {/* Booking */}
          <Route path='/booking'>
            <Route index element={<BookingPage />} />
            <Route path='add' element={<AddBookingPage />} />
            <Route path=':id/edit' element={<EditBookingPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default Router
