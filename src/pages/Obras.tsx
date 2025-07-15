import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, MapPin, Calendar, AlertTriangle, CheckCircle, Clock, Plus, Search, Filter } from "lucide-react";

interface Obra {
  id: string;
  endereco: string;
  proprietario: string;
  tipo: string;
  status: "regular" | "irregular" | "embargada" | "em_analise";
  dataInicio: Date;
  numeroAlvara?: string;
  area: number;
  fiscal: string;
  observacoes?: string;
}

const Obras = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("todas");
  
  const [obras] = useState<Obra[]>([
    {
      id: "1",
      endereco: "Rua das Flores, 123 - Centro",
      proprietario: "João Silva Santos",
      tipo: "Residencial",
      status: "regular",
      dataInicio: new Date("2024-01-15"),
      numeroAlvara: "ALV-2024-001",
      area: 120.5,
      fiscal: "Maria Oliveira",
      observacoes: "Obra dentro das normas"
    },
    {
      id: "2",
      endereco: "Av. Principal, 456 - Jardim América",
      proprietario: "Construtora ABC Ltda",
      tipo: "Comercial",
      status: "irregular",
      dataInicio: new Date("2024-01-20"),
      area: 350.0,
      fiscal: "Carlos Santos",
      observacoes: "Construção sem alvará"
    },
    {
      id: "3",
      endereco: "Rua Nova, 789 - Vila Esperança",
      proprietario: "Construtora XYZ",
      tipo: "Residencial",
      status: "embargada",
      dataInicio: new Date("2024-01-10"),
      area: 180.0,
      fiscal: "Ana Costa",
      observacoes: "Obra embargada por não conformidade"
    },
    {
      id: "4",
      endereco: "Rua Central, 321 - Bairro Novo",
      proprietario: "Pedro Oliveira",
      tipo: "Reforma",
      status: "em_analise",
      dataInicio: new Date("2024-01-25"),
      area: 95.0,
      fiscal: "Maria Oliveira",
      observacoes: "Aguardando documentação"
    }
  ]);

  const getStatusBadge = (status: Obra["status"]) => {
    const variants = {
      regular: { variant: "default" as const, icon: CheckCircle, text: "Regular" },
      irregular: { variant: "destructive" as const, icon: AlertTriangle, text: "Irregular" },
      embargada: { variant: "destructive" as const, icon: AlertTriangle, text: "Embargada" },
      em_analise: { variant: "secondary" as const, icon: Clock, text: "Em Análise" }
    };
    
    const config = variants[status];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  };

  const filteredObras = obras.filter(obra => {
    const matchesSearch = obra.endereco.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         obra.proprietario.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedTab === "todas") return matchesSearch;
    return matchesSearch && obra.status === selectedTab;
  });

  const stats = {
    total: obras.length,
    regulares: obras.filter(o => o.status === "regular").length,
    irregulares: obras.filter(o => o.status === "irregular").length,
    embargadas: obras.filter(o => o.status === "embargada").length,
    em_analise: obras.filter(o => o.status === "em_analise").length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Monitoramento de Obras</h1>
          <p className="text-gray-600">Acompanhe todas as obras e construções do município</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nova Obra
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-gray-400" />
        <Input
          placeholder="Pesquisar por endereço ou proprietário..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Tabs and Table */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="todas">Todas ({stats.total})</TabsTrigger>
          <TabsTrigger value="regular">Regulares ({stats.regulares})</TabsTrigger>
          <TabsTrigger value="irregular">Irregulares ({stats.irregulares})</TabsTrigger>
          <TabsTrigger value="embargada">Embargadas ({stats.embargadas})</TabsTrigger>
          <TabsTrigger value="em_analise">Em Análise ({stats.em_analise})</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Obras</CardTitle>
              <CardDescription>
                {filteredObras.length} obra(s) encontrada(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Endereço</TableHead>
                    <TableHead>Proprietário</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Área (m²)</TableHead>
                    <TableHead>Data Início</TableHead>
                    <TableHead>Fiscal</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredObras.map((obra) => (
                    <TableRow key={obra.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          {obra.endereco}
                        </div>
                      </TableCell>
                      <TableCell>{obra.proprietario}</TableCell>
                      <TableCell>{obra.tipo}</TableCell>
                      <TableCell>{getStatusBadge(obra.status)}</TableCell>
                      <TableCell>{obra.area.toFixed(1)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {obra.dataInicio.toLocaleDateString('pt-BR')}
                        </div>
                      </TableCell>
                      <TableCell>{obra.fiscal}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Ver Detalhes
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Obras;
