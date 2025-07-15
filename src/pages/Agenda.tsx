
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Clock, MapPin, User, Plus, Search, Filter, CheckCircle, AlertTriangle } from "lucide-react";

interface Agendamento {
  id: string;
  titulo: string;
  endereco: string;
  dataHora: Date;
  tipo: "vistoria" | "fiscalizacao" | "reuniao" | "audiencia";
  status: "agendado" | "em_andamento" | "concluido" | "cancelado";
  fiscal: string;
  observacoes?: string;
}

const Agenda = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const [agendamentos] = useState<Agendamento[]>([
    {
      id: "1",
      titulo: "Vistoria - Terreno Baldio",
      endereco: "Rua das Flores, 123 - Centro",
      dataHora: new Date("2024-01-25T09:00:00"),
      tipo: "vistoria",
      status: "agendado",
      fiscal: "João Silva",
      observacoes: "Primeira vistoria do terreno"
    },
    {
      id: "2",
      titulo: "Fiscalização - Bar Central",
      endereco: "Av. Principal, 456 - Centro",
      dataHora: new Date("2024-01-25T14:00:00"),
      tipo: "fiscalizacao",
      status: "agendado",
      fiscal: "Ana Costa",
      observacoes: "Reclamação de ruído"
    },
    {
      id: "3",
      titulo: "Reunião - Equipe de Fiscalização",
      endereco: "Prefeitura Municipal",
      dataHora: new Date("2024-01-26T08:30:00"),
      tipo: "reuniao",
      status: "agendado",
      fiscal: "Todos",
      observacoes: "Reunião semanal de planejamento"
    }
  ]);

  const getStatusBadge = (status: Agendamento["status"]) => {
    const variants = {
      agendado: { variant: "secondary" as const, icon: Clock, text: "Agendado" },
      em_andamento: { variant: "default" as const, icon: Clock, text: "Em Andamento" },
      concluido: { variant: "default" as const, icon: CheckCircle, text: "Concluído" },
      cancelado: { variant: "destructive" as const, icon: AlertTriangle, text: "Cancelado" }
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

  const getTipoBadge = (tipo: Agendamento["tipo"]) => {
    const variants = {
      vistoria: { variant: "default" as const, text: "Vistoria" },
      fiscalizacao: { variant: "secondary" as const, text: "Fiscalização" },
      reuniao: { variant: "outline" as const, text: "Reunião" },
      audiencia: { variant: "secondary" as const, text: "Audiência" }
    };
    
    return <Badge variant={variants[tipo].variant}>{variants[tipo].text}</Badge>;
  };

  const filteredAgendamentos = agendamentos.filter(agendamento =>
    agendamento.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agendamento.endereco.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agendamento.fiscal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agenda</h1>
          <p className="text-gray-600">Gerencie compromissos e agendamentos da fiscalização</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Novo Agendamento
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-gray-400" />
        <Input
          placeholder="Pesquisar por título, endereço ou fiscal..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Calendar View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Agendamentos
              </CardTitle>
              <CardDescription>
                {filteredAgendamentos.length} agendamento(s) encontrado(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Local</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Fiscal</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAgendamentos.map((agendamento) => (
                    <TableRow key={agendamento.id}>
                      <TableCell className="font-medium">{agendamento.titulo}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <div>
                            <div>{agendamento.dataHora.toLocaleDateString('pt-BR')}</div>
                            <div className="text-sm text-gray-500">
                              {agendamento.dataHora.toLocaleTimeString('pt-BR', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          {agendamento.endereco}
                        </div>
                      </TableCell>
                      <TableCell>{getTipoBadge(agendamento.tipo)}</TableCell>
                      <TableCell>{getStatusBadge(agendamento.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          {agendamento.fiscal}
                        </div>
                      </TableCell>
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
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Próximos Compromissos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {agendamentos
                .filter(a => a.status === "agendado")
                .sort((a, b) => a.dataHora.getTime() - b.dataHora.getTime())
                .slice(0, 3)
                .map(agendamento => (
                  <div key={agendamento.id} className="p-3 border rounded-lg">
                    <div className="font-medium text-sm">{agendamento.titulo}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {agendamento.dataHora.toLocaleDateString('pt-BR')} às{' '}
                      {agendamento.dataHora.toLocaleTimeString('pt-BR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      {getTipoBadge(agendamento.tipo)}
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resumo do Dia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total de compromissos:</span>
                  <span className="font-medium">{agendamentos.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Agendados:</span>
                  <span className="font-medium text-blue-600">
                    {agendamentos.filter(a => a.status === "agendado").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Concluídos:</span>
                  <span className="font-medium text-green-600">
                    {agendamentos.filter(a => a.status === "concluido").length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Agenda;
