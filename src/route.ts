import { createBrowserRouter } from 'react-router'

import MainLayout from './layouts/main-layout'
import AuthLayout from './layouts/auth-layout'

import Login from './pages/login'
import Register from './pages/register'
import DestinationPage from './pages/destination'
import UserPage from './pages/user'
import UserDetail from './pages/user/[id]'
import AddUserPage from './pages/user/add'
import EditUserPage from './pages/user/[id]/edit'

const router = createBrowserRouter([
  {
    // Layout for auth & theme
    Component: MainLayout,
    children: [
      {
        // Layout for main app with sidebar
        Component: AuthLayout,
        children: [
          {
            index: true,
            Component: DestinationPage
          },
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
          }
        ]
      },
      // Login & Register does not have sidebar
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      }
    ]
  }
])

export default router
