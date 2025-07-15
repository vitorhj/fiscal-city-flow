import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TreePine, MapPin, Calendar, AlertTriangle, CheckCircle, Clock, Plus, Search, Filter } from "lucide-react";

interface Terreno {
  id: string;
  endereco: string;
  proprietario: string;
  area: number;
  status: "regular" | "irregular" | "notificado" | "multado";
  dataVistoria: Date;
  condicao: "limpo" | "mato_alto" | "entulho" | "construcao_irregular";
  fiscal: string;
  observacoes?: string;
}

const Terrenos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("todos");
  
  const [terrenos] = useState<Terreno[]>([
    {
      id: "1",
      endereco: "Rua Verde, 100 - Centro",
      proprietario: "Maria Santos",
      area: 450.0,
      status: "regular",
      dataVistoria: new Date("2024-01-15"),
      condicao: "limpo",
      fiscal: "João Silva",
      observacoes: "Terreno bem conservado"
    },
    {
      id: "2",
      endereco: "Av. das Palmeiras, 200 - Vila Nova",
      proprietario: "José Oliveira",
      area: 300.0,
      status: "irregular",
      dataVistoria: new Date("2024-01-20"),
      condicao: "mato_alto",
      fiscal: "Ana Costa",
      observacoes: "Mato alto, presença de mosquitos"
    },
    {
      id: "3",
      endereco: "Rua da Paz, 150 - Jardim América",
      proprietario: "Carlos Pereira",
      area: 600.0,
      status: "notificado",
      dataVistoria: new Date("2024-01-18"),
      condicao: "entulho",
      fiscal: "Maria Oliveira",
      observacoes: "Descarte irregular de entulho"
    },
    {
      id: "4",
      endereco: "Rua dos Ipês, 75 - Bairro Novo",
      proprietario: "Antônio Silva",
      area: 250.0,
      status: "multado",
      dataVistoria: new Date("2024-01-12"),
      condicao: "construcao_irregular",
      fiscal: "Carlos Santos",
      observacoes: "Construção irregular no terreno"
    }
  ]);

  const getStatusBadge = (status: Terreno["status"]) => {
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

  const getCondicaoBadge = (condicao: Terreno["condicao"]) => {
    const variants = {
      limpo: { variant: "default" as const, text: "Limpo" },
      mato_alto: { variant: "secondary" as const, text: "Mato Alto" },
      entulho: { variant: "destructive" as const, text: "Com Entulho" },
      construcao_irregular: { variant: "destructive" as const, text: "Construção Irregular" }
    };
    
    const config = variants[condicao];
    
    return (
      <Badge variant={config.variant}>
        {config.text}
      </Badge>
    );
  };

  const filteredTerrenos = terrenos.filter(terreno => {
    const matchesSearch = terreno.endereco.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         terreno.proprietario.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedTab === "todos") return matchesSearch;
    return matchesSearch && terreno.status === selectedTab;
  });

  const stats = {
    total: terrenos.length,
    regulares: terrenos.filter(t => t.status === "regular").length,
    irregulares: terrenos.filter(t => t.status === "irregular").length,
    notificados: terrenos.filter(t => t.status === "notificado").length,
    multados: terrenos.filter(t => t.status === "multado").length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Monitoramento de Terrenos Baldios</h1>
          <p className="text-gray-600">Fiscalize terrenos baldios e sua conservação</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nova Vistoria
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
          <TabsTrigger value="todos">Todos ({stats.total})</TabsTrigger>
          <TabsTrigger value="regular">Regulares ({stats.regulares})</TabsTrigger>
          <TabsTrigger value="irregular">Irregulares ({stats.irregulares})</TabsTrigger>
          <TabsTrigger value="notificado">Notificados ({stats.notificados})</TabsTrigger>
          <TabsTrigger value="multado">Multados ({stats.multados})</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Terrenos</CardTitle>
              <CardDescription>
                {filteredTerrenos.length} terreno(s) encontrado(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Endereço</TableHead>
                    <TableHead>Proprietário</TableHead>
                    <TableHead>Área (m²)</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Condição</TableHead>
                    <TableHead>Última Vistoria</TableHead>
                    <TableHead>Fiscal</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTerrenos.map((terreno) => (
                    <TableRow key={terreno.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          {terreno.endereco}
                        </div>
                      </TableCell>
                      <TableCell>{terreno.proprietario}</TableCell>
                      <TableCell>{terreno.area.toFixed(1)}</TableCell>
                      <TableCell>{getStatusBadge(terreno.status)}</TableCell>
                      <TableCell>{getCondicaoBadge(terreno.condicao)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {terreno.dataVistoria.toLocaleDateString('pt-BR')}
                        </div>
                      </TableCell>
                      <TableCell>{terreno.fiscal}</TableCell>
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

export default Terrenos;
