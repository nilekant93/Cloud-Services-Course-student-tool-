import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Week1 from "./pages/Week1";
import Week2 from "./pages/Week2";
import Week3 from "./pages/Week3";
import Week4 from "./pages/Week4";
import Week5 from "./pages/Week5";
import Week6 from "./pages/Week6";
import Week7 from "./pages/Week7";
import Week8 from "./pages/Week8";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ lisää tämä

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* Suojatut viikkosivut */}
          <Route path="/week1" element={<ProtectedRoute><Week1 /></ProtectedRoute>} />
          <Route path="/week2" element={<ProtectedRoute><Week2 /></ProtectedRoute>} />
          <Route path="/week3" element={<ProtectedRoute><Week3 /></ProtectedRoute>} />
          <Route path="/week4" element={<ProtectedRoute><Week4 /></ProtectedRoute>} />
          <Route path="/week5" element={<ProtectedRoute><Week5 /></ProtectedRoute>} />
          <Route path="/week6" element={<ProtectedRoute><Week6 /></ProtectedRoute>} />
          <Route path="/week7" element={<ProtectedRoute><Week7 /></ProtectedRoute>} />
          <Route path="/week8" element={<ProtectedRoute><Week8 /></ProtectedRoute>} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
