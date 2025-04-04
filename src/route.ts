import { createBrowserRouter } from 'react-router'

import Root from './Root'
import App from './App'
import Login from './pages/login'
import UserPage from './pages/user'
import UserDetail from './pages/user/[id]'
import AddUserPage from './pages/user/add'
import EditUserPage from './pages/user/[id]/edit'

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
  {
    path: 'login',
    Component: Login
  }
])

export default router
