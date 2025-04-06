import { createBrowserRouter } from 'react-router'

// Layout
import MainLayout from './layouts/main-layout'
import AuthLayout from './layouts/auth-layout'

// Auth
import Login from './pages/login'
import Register from './pages/register'

// Destination
import DestinationPage from './pages/destination'
import AddDestinationPage from './pages/destination/add'
import EditDestinationPage from './pages/destination/[id]/edit'

// Vacation
import VacationPage from './pages/vacation'
import AddVacationPage from './pages/vacation/add'
import EditVacationPage from './pages/vacation/[id]/edit'

// User
import UserPage from './pages/user'
import UserDetail from './pages/user/[id]'
import AddUserPage from './pages/user/add'
import EditUserPage from './pages/user/[id]/edit'

// Booking
import BookingPage from './pages/booking'
import AddBookingPage from './pages/booking/add'
import EditBookingPage from './pages/booking/[id]/edit'

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
                path: ':id',
                Component: UserDetail
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
