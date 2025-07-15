import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gavel, MapPin, Calendar, AlertTriangle, CheckCircle, Clock, Plus, Search, Filter, Store } from "lucide-react";

interface Postura {
  id: string;
  estabelecimento: string;
  endereco: string;
  proprietario: string;
  tipo: "comercio" | "servico" | "industrial" | "evento";
  infracao: string;
  status: "regular" | "irregular" | "notificado" | "multado";
  dataFiscalizacao: Date;
  valor?: number;
  fiscal: string;
  observacoes?: string;
}

const Posturas = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("todas");
  
  const [posturas] = useState<Postura[]>([
    {
      id: "1",
      estabelecimento: "Padaria do João",
      endereco: "Rua das Flores, 123 - Centro",
      proprietario: "João Silva Santos",
      tipo: "comercio",
      infracao: "Funcionamento dentro do horário permitido",
      status: "regular",
      dataFiscalizacao: new Date("2024-01-15"),
      fiscal: "Maria Oliveira"
    },
    {
      id: "2",
      estabelecimento: "Bar e Restaurante Central",
      endereco: "Av. Principal, 456 - Centro",
      proprietario: "Carlos Pereira",
      tipo: "comercio",
      infracao: "Som alto após 22h",
      status: "multado",
      dataFiscalizacao: new Date("2024-01-20"),
      valor: 500.00,
      fiscal: "Ana Costa",
      observacoes: "Reincidência - multa aplicada"
    },
    {
      id: "3",
      estabelecimento: "Oficina Mecânica Silva",
      endereco: "Rua Industrial, 789 - Vila Nova",
      proprietario: "José Silva",
      tipo: "servico",
      infracao: "Funcionamento fora do horário permitido",
      status: "notificado",
      dataFiscalizacao: new Date("2024-01-18"),
      fiscal: "Carlos Santos",
      observacoes: "Funcionando aos domingos"
    },
    {
      id: "4",
      estabelecimento: "Festa Junina - Associação de Moradores",
      endereco: "Praça Central - Centro",
      proprietario: "Associação Bairro Centro",
      tipo: "evento",
      infracao: "Evento sem autorização",
      status: "irregular",
      dataFiscalizacao: new Date("2024-01-22"),
      fiscal: "Maria Oliveira",
      observacoes: "Evento realizado sem alvará"
    }
  ]);

  const getStatusBadge = (status: Postura["status"]) => {
    const variants = {
      regular: { variant: "default" as const, icon: CheckCircle, text: "Regular" },
      irregular: { variant: "destructive" as const, icon: AlertTriangle, text: "Irregular" },
      notificado: { variant: "secondary" as const, icon: Clock, text: "Notificado" },
      multado: { variant: "destructive" as const, icon: AlertTriangle, text: "Multado" }
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

  const getTipoBadge = (tipo: Postura["tipo"]) => {
    const variants = {
      comercio: { variant: "default" as const, text: "Comércio" },
      servico: { variant: "secondary" as const, text: "Serviço" },
      industrial: { variant: "outline" as const, text: "Industrial" },
      evento: { variant: "secondary" as const, text: "Evento" }
    };
    
    const config = variants[tipo];
    
    return (
      <Badge variant={config.variant}>
        {config.text}
      </Badge>
    );
  };

  const filteredPosturas = posturas.filter(postura => {
    const matchesSearch = postura.estabelecimento.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         postura.endereco.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         postura.proprietario.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedTab === "todas") return matchesSearch;
    return matchesSearch && postura.status === selectedTab;
  });

  const stats = {
    total: posturas.length,
    regulares: posturas.filter(p => p.status === "regular").length,
    irregulares: posturas.filter(p => p.status === "irregular").length,
    notificadas: posturas.filter(p => p.status === "notificado").length,
    multadas: posturas.filter(p => p.status === "multado").length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fiscalização de Posturas</h1>
          <p className="text-gray-600">Fiscalize estabelecimentos e eventos conforme as posturas municipais</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nova Fiscalização
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-gray-400" />
        <Input
          placeholder="Pesquisar por estabelecimento, endereço ou proprietário..."
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
          <TabsTrigger value="notificado">Notificadas ({stats.notificadas})</TabsTrigger>
          <TabsTrigger value="multado">Multadas ({stats.multadas})</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Fiscalizações de Postura</CardTitle>
              <CardDescription>
                {filteredPosturas.length} fiscalização(ões) encontrada(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Estabelecimento</TableHead>
                    <TableHead>Endereço</TableHead>
                    <TableHead>Proprietário</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Fiscal</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosturas.map((postura) => (
                    <TableRow key={postura.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Store className="h-4 w-4 text-gray-400" />
                          {postura.estabelecimento}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          {postura.endereco}
                        </div>
                      </TableCell>
                      <TableCell>{postura.proprietario}</TableCell>
                      <TableCell>{getTipoBadge(postura.tipo)}</TableCell>
                      <TableCell>{getStatusBadge(postura.status)}</TableCell>
                      <TableCell>
                        {postura.valor ? `R$ ${postura.valor.toFixed(2)}` : "-"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {postura.dataFiscalizacao.toLocaleDateString('pt-BR')}
                        </div>
                      </TableCell>
                      <TableCell>{postura.fiscal}</TableCell>
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

export default Posturas;
