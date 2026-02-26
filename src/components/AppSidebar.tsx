import { Link, useLocation } from "react-router-dom";
import {
  Home, Bot, Link2, BarChart3, ClipboardList, Target,
  LayoutDashboard, Stethoscope, Pill, Shield, Syringe,
  Activity, Bug, Package, DollarSign, Megaphone, FlaskConical,
  Baby, HeartPulse, Database, Cloud, Microscope, Plane,
  Users, Building2, AppWindow, FileText, Settings, ChevronDown,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarHeader, SidebarFooter,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import sproxilLogo from "@/assets/sproxil-logo-red.jpg";

const mainNav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/aisha", label: "AISHA Agent", icon: Bot },
  { to: "/supply-chain", label: "Supply Chain", icon: Link2 },
  { to: "/tpr-dashboard", label: "TPR Dashboard", icon: BarChart3 },
  { to: "/survey", label: "Survey & Incentives", icon: ClipboardList },
  { to: "/me-framework", label: "M&E Framework", icon: Target },
];

const platformNav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/aisha-platform", label: "AISHA Platform", icon: Bot },
  { to: "/apps-directory", label: "Apps Directory", icon: AppWindow },
  { to: "/reports", label: "Reports & Exports", icon: FileText },
];

const thematicModules = [
  { to: "/modules/case-management", label: "Case Management & Diagnosis", icon: Stethoscope },
  { to: "/modules/treatment", label: "Treatment & Drug Quality", icon: Pill },
  { to: "/modules/vector-control", label: "Vector Control", icon: Shield },
  { to: "/modules/chemoprevention", label: "Chemoprevention", icon: Syringe },
  { to: "/modules/surveillance", label: "Surveillance & Epidemiology", icon: Activity },
  { to: "/modules/entomology", label: "Entomology & Resistance", icon: Bug },
  { to: "/modules/supply-chain-commodities", label: "Supply Chain & Commodities", icon: Package },
  { to: "/modules/financing", label: "Financing & Costs", icon: DollarSign },
  { to: "/modules/sbcc", label: "SBCC", icon: Megaphone },
  { to: "/modules/research", label: "Research & Innovation", icon: FlaskConical },
  { to: "/modules/malaria-pregnancy", label: "Malaria in Pregnancy", icon: Baby },
  { to: "/modules/community-health", label: "Community Health Workers", icon: HeartPulse },
  { to: "/modules/data-quality", label: "Data Quality & HMIS", icon: Database },
  { to: "/modules/climate", label: "Climate & Environment", icon: Cloud },
  { to: "/modules/vaccines", label: "Malaria Vaccines", icon: Microscope },
  { to: "/modules/cross-border", label: "Cross-Border & Migration", icon: Plane },
  { to: "/modules/gender-equity", label: "Gender & Equity", icon: Users },
  { to: "/modules/private-sector", label: "Private Sector & PPMV", icon: Building2 },
];

const NavItem = ({ to, label, icon: Icon }: { to: string; label: string; icon: React.ElementType }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link to={to}>
          <Icon className="w-4 h-4" />
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

const AppSidebar = () => {
  const location = useLocation();
  const isModuleActive = location.pathname.startsWith("/modules");

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2">
          <img src={sproxilLogo} alt="Sproxil" className="h-8" />
        </Link>
        <p className="text-[10px] text-sidebar-foreground/60 mt-1 font-body">
          ADMFm Malaria Intelligence Platform
        </p>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <NavItem key={item.to} {...item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Platform */}
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {platformNav.map((item) => (
                <NavItem key={item.to} {...item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Thematic Modules — Collapsible */}
        <SidebarGroup>
          <Collapsible defaultOpen={isModuleActive}>
            <CollapsibleTrigger className="w-full">
              <SidebarGroupLabel className="flex items-center justify-between w-full cursor-pointer hover:text-sidebar-foreground transition-colors">
                <span>Thematic Modules</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {thematicModules.map((item) => (
                    <NavItem key={item.to} {...item} />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 border-t border-sidebar-border">
        <SidebarMenu>
          <NavItem to="/settings" label="Settings" icon={Settings} />
        </SidebarMenu>
        <p className="text-[9px] text-sidebar-foreground/40 text-center mt-2 font-body">
          © {new Date().getFullYear()} Sproxil Inc.
        </p>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
