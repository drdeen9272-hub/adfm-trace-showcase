import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import SidebarLayout from "@/layouts/SidebarLayout";
import PageTransition from "@/components/PageTransition";
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

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/aisha" element={<PageTransition><AishaPage /></PageTransition>} />
        <Route path="/supply-chain" element={<PageTransition><SupplyChainPage /></PageTransition>} />
        <Route path="/tpr-dashboard" element={<PageTransition><TPRDashboardPage /></PageTransition>} />
        <Route path="/survey" element={<PageTransition><SurveyPage /></PageTransition>} />
        <Route path="/me-framework" element={<PageTransition><MEFrameworkPage /></PageTransition>} />
        <Route path="/dashboard" element={<PageTransition><DashboardPage /></PageTransition>} />
        <Route path="/aisha-platform" element={<PageTransition><AishaPlatformPage /></PageTransition>} />
        <Route path="/apps-directory" element={<PageTransition><AppsDirectoryPage /></PageTransition>} />
        <Route path="/reports" element={<PageTransition><ReportsPage /></PageTransition>} />
        <Route path="/settings" element={<PageTransition><SettingsPage /></PageTransition>} />
        <Route path="/modules/:moduleId" element={<PageTransition><ModulePlaceholderPage /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarLayout>
          <AnimatedRoutes />
        </SidebarLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
