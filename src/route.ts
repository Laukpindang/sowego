import { createBrowserRouter } from 'react-router'

import Root from './Root'
import App from './App'
import Login from './pages/login'
import UserPage from './pages/user'
import UserDetail from './pages/user/[id]'

const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        index: true,
        Component: App
      },
      {
        path: 'login',
        Component: Login
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
          }
        ]
      }
    ]
  }
])

export default router
