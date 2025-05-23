
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OrdersProvider } from "./context/OrdersContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import KitchenDisplay from "./pages/KitchenDisplay";
import Cashier from "./pages/Cashier";
import Settings from "./pages/Settings";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import SuperAdmin from "./pages/SuperAdmin";
import Login from "./pages/Login";
import Register from "./pages/Register";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <OrdersProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/kds" element={<KitchenDisplay />} />
            <Route path="/cashier" element={<Cashier />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/admin" element={<Index />} />
            <Route path="/superadmin" element={<SuperAdmin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </OrdersProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
