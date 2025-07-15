
import { useState, useEffect } from "react";
import { DashboardCard } from "@/components/DashboardCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  AlertTriangle, 
  Building, 
  DollarSign, 
  Clock, 
  TrendingUp,
  Calendar,
  Users
} from "lucide-react";
import { DashboardStats } from "@/types/fiscalizacao";

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalNotificacoes: 0,
    notificacoesPendentes: 0,
    obrasIrregulares: 0,
    multasEmitidas: 0,
    valorTotalMultas: 0,
    prazoVencendoHoje: 0
  });

  // Simular dados do dashboard
  useEffect(() => {
    // Em um sistema real, estes dados viriam de uma API
    setStats({
      totalNotificacoes: 1247,
      notificacoesPendentes: 89,
      obrasIrregulares: 34,
      multasEmitidas: 156,
      valorTotalMultas: 245780.50,
      prazoVencendoHoje: 12
    });
  }, []);

  const proximasAcoes = [
    {
      tipo: "Intimação",
      numero: "INT-2024-001234",
      contribuinte: "João da Silva Santos",
      endereco: "Rua das Flores, 123",
      vencimento: "Hoje",
      urgencia: "alta"
    },
    {
      tipo: "Notificação",
      numero: "NOT-2024-005678",
      contribuinte: "Maria Comercial Ltda",
      endereco: "Av. Principal, 456",
      vencimento: "Amanhã",
      urgencia: "media"
    },
    {
      tipo: "Embargo",
      numero: "EMB-2024-009876",
      contribuinte: "Construtora ABC",
      endereco: "Rua Nova, 789",
      vencimento: "Em 2 dias",
      urgencia: "alta"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Visão geral do sistema de fiscalização</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Agenda
          </Button>
          <Button className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Nova Notificação
          </Button>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total de Notificações"
          value={stats.totalNotificacoes.toLocaleString()}
          icon={FileText}
          trend={{ value: 12, isPositive: true }}
          color="blue"
        />
        <DashboardCard
          title="Notificações Pendentes"
          value={stats.notificacoesPendentes}
          icon={Clock}
          trend={{ value: -5, isPositive: false }}
          color="yellow"
        />
        <DashboardCard
          title="Obras Irregulares"
          value={stats.obrasIrregulares}
          icon={Building}
          trend={{ value: 8, isPositive: false }}
          color="red"
        />
        <DashboardCard
          title="Valor Total em Multas"
          value={`R$ ${stats.valorTotalMultas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          icon={DollarSign}
          trend={{ value: 23, isPositive: true }}
          color="green"
        />
      </div>

      {/* Alertas e Ações Prioritárias */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Prazos Vencendo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Prazos Vencendo Hoje ({stats.prazoVencendoHoje})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {proximasAcoes.map((acao, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        acao.urgencia === 'alta' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {acao.tipo}
                      </span>
                      <span className="text-sm font-medium">{acao.numero}</span>
                    </div>
                    <p className="text-sm text-gray-600">{acao.contribuinte}</p>
                    <p className="text-xs text-gray-500">{acao.endereco}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-red-600">{acao.vencimento}</p>
                    <Button size="sm" variant="outline" className="mt-1">
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resumo Mensal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Resumo do Mês
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Notificações Emitidas</span>
                <span className="font-semibold">87</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Intimações</span>
                <span className="font-semibold">34</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Embargos</span>
                <span className="font-semibold text-red-600">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Multas Aplicadas</span>
                <span className="font-semibold">23</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between items-center font-medium">
                  <span>Taxa de Cumprimento</span>
                  <span className="text-green-600">78%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mapa de Calor de Fiscalizações (Placeholder) */}
      <Card>
        <CardHeader>
          <CardTitle>Áreas com Maior Incidência de Irregularidades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <Building className="h-12 w-12 mx-auto mb-2" />
              <p>Mapa de calor será implementado aqui</p>
              <p className="text-sm">Integração com sistema de geolocalização</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
