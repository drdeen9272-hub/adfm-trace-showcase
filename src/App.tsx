import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SidebarLayout from "@/layouts/SidebarLayout";
import Index from "./pages/Index";
import AishaPage from "./pages/AishaPage";
import SupplyChainPage from "./pages/SupplyChainPage";
import TPRDashboardPage from "./pages/TPRDashboardPage";
import SurveyPage from "./pages/SurveyPage";
import MEFrameworkPage from "./pages/MEFrameworkPage";
import DashboardPage from "./pages/DashboardPage";
import AishaPlatformPage from "./pages/AishaPlatformPage";
import AppsDirectoryPage from "./pages/AppsDirectoryPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import ModulePlaceholderPage from "./pages/ModulePlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/aisha" element={<AishaPage />} />
            <Route path="/supply-chain" element={<SupplyChainPage />} />
            <Route path="/tpr-dashboard" element={<TPRDashboardPage />} />
            <Route path="/survey" element={<SurveyPage />} />
            <Route path="/me-framework" element={<MEFrameworkPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/aisha-platform" element={<AishaPlatformPage />} />
            <Route path="/apps-directory" element={<AppsDirectoryPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/modules/:moduleId" element={<ModulePlaceholderPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SidebarLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
