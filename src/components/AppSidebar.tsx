
import { useState } from "react";
import { 
  Home, 
  FileText, 
  AlertTriangle, 
  Building, 
  Gavel, 
  Users, 
  Settings,
  Calendar,
  BarChart3
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Notificações", url: "/notificacoes", icon: FileText },
  { title: "Obras Irregulares", url: "/obras", icon: Building },
  { title: "Infrações", url: "/infracoes", icon: AlertTriangle },
  { title: "Posturas", url: "/posturas", icon: Gavel },
  { title: "Agenda", url: "/agenda", icon: Calendar },
  { title: "Relatórios", url: "/relatorios", icon: BarChart3 },
  { title: "Usuários", url: "/usuarios", icon: Users },
  { title: "Configurações", url: "/configuracoes", icon: Settings },
];

export function AppSidebar() {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const isExpanded = menuItems.some((item) => isActive(item.url));

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-blue-100 text-blue-700 font-medium border-r-2 border-blue-600" : "hover:bg-gray-100";

  return (
    <Sidebar
      className={collapsed ? "w-14" : "w-64"}
      collapsible
    >
      <SidebarTrigger className="m-2 self-end" />

      <SidebarContent className="bg-white border-r">
        <div className="p-4 border-b">
          <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <Gavel className="h-5 w-5" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-bold text-gray-900">Fiscalização</h2>
                <p className="text-xs text-gray-500">Prefeitura Municipal</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup open={isExpanded}>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Sistema de Fiscalização
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-5 w-5 mr-3" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
