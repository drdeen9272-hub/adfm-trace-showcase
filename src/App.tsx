import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import AishaPage from "./pages/AishaPage";
import SupplyChainPage from "./pages/SupplyChainPage";
import TPRDashboardPage from "./pages/TPRDashboardPage";
import SurveyPage from "./pages/SurveyPage";
import MEFrameworkPage from "./pages/MEFrameworkPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/aisha" element={<AishaPage />} />
          <Route path="/supply-chain" element={<SupplyChainPage />} />
          <Route path="/tpr-dashboard" element={<TPRDashboardPage />} />
          <Route path="/survey" element={<SurveyPage />} />
          <Route path="/me-framework" element={<MEFrameworkPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
