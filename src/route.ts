import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'

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

const router = createBrowserRouter([
  {
    // Layout for auth & theme
    Component: MainLayout,
    children: [
      {
        // Layout for main app with sidebar
        Component: AuthLayout,
        children: [
          // Destination
          {
            path: '/',
            children: [
              {
                index: true,
                Component: DestinationPage
              },
              {
                path: '/destination/add',
                Component: AddDestinationPage
              },
              {
                path: '/destination/:id/edit',
                Component: EditDestinationPage
              }
            ]
          },
          // Vacation
          {
            path: 'vacation',
            children: [
              {
                index: true,
                Component: VacationPage
              },
              {
                path: 'add',
                Component: AddVacationPage
              },
              {
                path: ':id/edit',
                Component: EditVacationPage
              }
            ]
          },
          // User
          {
            path: 'user',
            children: [
              {
                index: true,
                Component: UserPage
              },
              {
                path: 'add',
                Component: AddUserPage
              },
              {
                path: ':id/edit',
                Component: EditUserPage
              }
            ]
          },
          // Booking
          {
            path: 'booking',
            children: [
              {
                index: true,
                Component: BookingPage
              },
              {
                path: 'add',
                Component: AddBookingPage
              },
              {
                path: ':id/edit',
                Component: EditBookingPage
              }
            ]
          }
        ]
      },
      // Login & Register does not have sidebar
      {
        // Login
        path: 'login',
        Component: Login
      },
      {
        // Register
        path: 'register',
        Component: Register
      }
    ]
  }
])

export default router
