import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BarChart3, PieChart, FileText, Download, Calendar, TrendingUp, Users, Building, TreePine, Gavel } from "lucide-react";

const Relatorios = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("mes");
  const [selectedType, setSelectedType] = useState("geral");

  const relatoriosDisponiveis = [
    {
      id: "obras",
      titulo: "Relatório de Obras",
      descricao: "Análise completa das obras fiscalizadas",
      icon: Building,
      tipo: "Operacional"
    },
    {
      id: "terrenos",
      titulo: "Relatório de Terrenos Baldios",
      descricao: "Situação dos terrenos baldios no município",
      icon: TreePine,
      tipo: "Operacional"
    },
    {
      id: "posturas",
      titulo: "Relatório de Posturas",
      descricao: "Fiscalizações de estabelecimentos e eventos",
      icon: Gavel,
      tipo: "Operacional"
    },
    {
      id: "fiscais",
      titulo: "Relatório de Produtividade",
      descricao: "Desempenho da equipe de fiscalização",
      icon: Users,
      tipo: "Gerencial"
    },
    {
      id: "financeiro",
      titulo: "Relatório Financeiro",
      descricao: "Arrecadação de multas e taxas",
      icon: TrendingUp,
      tipo: "Financeiro"
    },
    {
      id: "consolidado",
      titulo: "Relatório Consolidado",
      descricao: "Visão geral de todas as atividades",
      icon: BarChart3,
      tipo: "Executivo"
    }
  ];

  const estatisticas = {
    totalRelatorios: 24,
    relatoriosMes: 8,
    crescimento: 15.2,
    maiorCategoria: "Obras"
  };

  const getTipoBadge = (tipo: string) => {
    const variants = {
      "Operacional": "default",
      "Gerencial": "secondary",
      "Financeiro": "outline",
      "Executivo": "destructive"
    } as const;
    
    return <Badge variant={variants[tipo as keyof typeof variants] || "default"}>{tipo}</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
          <p className="text-gray-600">Gere relatórios detalhados das atividades de fiscalização</p>
        </div>
        <Button className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Relatório Personalizado
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semana">Esta Semana</SelectItem>
              <SelectItem value="mes">Este Mês</SelectItem>
              <SelectItem value="trimestre">Este Trimestre</SelectItem>
              <SelectItem value="ano">Este Ano</SelectItem>
              <SelectItem value="personalizado">Personalizado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-gray-500" />
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="geral">Todos</SelectItem>
              <SelectItem value="operacional">Operacional</SelectItem>
              <SelectItem value="gerencial">Gerencial</SelectItem>
              <SelectItem value="financeiro">Financeiro</SelectItem>
              <SelectItem value="executivo">Executivo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Relatórios</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas.totalRelatorios}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Este Mês</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas.relatoriosMes}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crescimento</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+{estatisticas.crescimento}%</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categoria Principal</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas.maiorCategoria}</div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Relatórios */}
      <Card>
        <CardHeader>
          <CardTitle>Relatórios Disponíveis</CardTitle>
          <CardDescription>
            Selecione o tipo de relatório que deseja gerar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatoriosDisponiveis
              .filter(relatorio => selectedType === "geral" || relatorio.tipo.toLowerCase() === selectedType)
              .map((relatorio) => {
                const Icon = relatorio.icon;
                return (
                  <Card key={relatorio.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <Icon className="h-8 w-8 text-blue-600" />
                        {getTipoBadge(relatorio.tipo)}
                      </div>
                      <CardTitle className="text-lg">{relatorio.titulo}</CardTitle>
                      <CardDescription className="text-sm">
                        {relatorio.descricao}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Visualizar
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </CardContent>
      </Card>

      {/* Relatórios Recentes */}
      <Card>
        <CardHeader>
          <CardTitle>Relatórios Recentes</CardTitle>
          <CardDescription>
            Últimos relatórios gerados pela equipe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { nome: "Relatório Mensal - Janeiro 2024", tipo: "Consolidado", data: "25/01/2024", usuario: "João Silva" },
              { nome: "Fiscalização de Obras - Semana 3", tipo: "Operacional", data: "22/01/2024", usuario: "Ana Costa" },
              { nome: "Arrecadação de Multas - Q4 2023", tipo: "Financeiro", data: "20/01/2024", usuario: "Carlos Santos" }
            ].map((relatorio, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <FileText className="h-8 w-8 text-gray-400" />
                  <div>
                    <div className="font-medium">{relatorio.nome}</div>
                    <div className="text-sm text-gray-500">
                      {relatorio.tipo} • {relatorio.data} • por {relatorio.usuario}
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Relatorios;
