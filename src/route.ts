import { createBrowserRouter } from 'react-router'

import App from './App'
import Login from './pages/login'
import UserPage from './pages/user'

const router = createBrowserRouter([
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
    Component: UserPage
  }
])

export default router
