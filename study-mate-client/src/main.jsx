import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./routes/PrublicRoutes";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./context/AuthContext/AuthProvider";

// React Query imports
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a React Query client instance
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
