import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router/dom"

import router from "@/router"
import UserContextProvider from "@contexts/User"
import { Toaster } from "sonner"

import "@/index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
    <Toaster richColors />
  </StrictMode>,
)
