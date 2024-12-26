import { createBrowserRouter } from "react-router"

import authRoutes from "@router/Auth"
import guestRoutes from "@router/Guest"
import publicRoutes from "@router/Public"

const router = createBrowserRouter([
  ...authRoutes,
  ...guestRoutes,
  ...publicRoutes,
])

export default router
