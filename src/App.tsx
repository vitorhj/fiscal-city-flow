
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Dashboard from "./pages/Dashboard";
import Notificacoes from "./pages/Notificacoes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider collapsedWidth={56}>
          <div className="min-h-screen flex w-full bg-gray-50">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              {/* Header Global */}
              <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 shadow-sm">
                <SidebarTrigger className="mr-4" />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Sistema de Fiscalização Municipal
                  </h2>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">Fiscal João Silva</p>
                    <p className="text-xs text-gray-500">Setor de Obras</p>
                  </div>
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    JS
                  </div>
                </div>
              </header>

              {/* Main Content */}
              <main className="flex-1 overflow-auto">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/notificacoes" element={<Notificacoes />} />
                  <Route path="/obras" element={<div className="p-6"><h1 className="text-2xl font-bold">Obras Irregulares</h1><p className="text-gray-600">Em desenvolvimento...</p></div>} />
                  <Route path="/infracoes" element={<div className="p-6"><h1 className="text-2xl font-bold">Infrações</h1><p className="text-gray-600">Em desenvolvimento...</p></div>} />
                  <Route path="/posturas" element={<div className="p-6"><h1 className="text-2xl font-bold">Posturas</h1><p className="text-gray-600">Em desenvolvimento...</p></div>} />
                  <Route path="/agenda" element={<div className="p-6"><h1 className="text-2xl font-bold">Agenda</h1><p className="text-gray-600">Em desenvolvimento...</p></div>} />
                  <Route path="/relatorios" element={<div className="p-6"><h1 className="text-2xl font-bold">Relatórios</h1><p className="text-gray-600">Em desenvolvimento...</p></div>} />
                  <Route path="/usuarios" element={<div className="p-6"><h1 className="text-2xl font-bold">Usuários</h1><p className="text-gray-600">Em desenvolvimento...</p></div>} />
                  <Route path="/configuracoes" element={<div className="p-6"><h1 className="text-2xl font-bold">Configurações</h1><p className="text-gray-600">Em desenvolvimento...</p></div>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
