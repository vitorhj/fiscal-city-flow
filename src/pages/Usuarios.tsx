
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Users, Shield, Mail, Phone, Plus, Search, Filter, Settings, UserCheck, UserX } from "lucide-react";

interface Usuario {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  setor: "obras" | "posturas" | "terrenos" | "administracao";
  status: "ativo" | "inativo" | "licenca";
  nivel: "fiscal" | "supervisor" | "coordenador" | "administrador";
  dataContratacao: Date;
  ultimoAcesso?: Date;
}

const Usuarios = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("todos");
  
  const [usuarios] = useState<Usuario[]>([
    {
      id: "1",
      nome: "João Silva Santos",
      email: "joao.silva@prefeitura.gov.br",
      telefone: "(11) 99999-1111",
      cargo: "Fiscal de Obras",
      setor: "obras",
      status: "ativo",
      nivel: "fiscal",
      dataContratacao: new Date("2020-03-15"),
      ultimoAcesso: new Date("2024-01-25T08:30:00")
    },
    {
      id: "2",
      nome: "Ana Costa Oliveira",
      email: "ana.costa@prefeitura.gov.br",
      telefone: "(11) 99999-2222",
      cargo: "Fiscal de Posturas",
      setor: "posturas",
      status: "ativo",
      nivel: "fiscal",
      dataContratacao: new Date("2019-08-20"),
      ultimoAcesso: new Date("2024-01-25T09:15:00")
    },
    {
      id: "3",
      nome: "Carlos Santos Pereira",
      email: "carlos.santos@prefeitura.gov.br",
      telefone: "(11) 99999-3333",
      cargo: "Supervisor de Fiscalização",
      setor: "administracao",
      status: "ativo",
      nivel: "supervisor",
      dataContratacao: new Date("2018-01-10"),
      ultimoAcesso: new Date("2024-01-25T07:45:00")
    },
    {
      id: "4",
      nome: "Maria Oliveira Silva",
      email: "maria.oliveira@prefeitura.gov.br",
      telefone: "(11) 99999-4444",
      cargo: "Fiscal de Terrenos",
      setor: "terrenos",
      status: "licenca",
      nivel: "fiscal",
      dataContratacao: new Date("2021-06-01"),
      ultimoAcesso: new Date("2024-01-20T16:20:00")
    }
  ]);

  const getStatusBadge = (status: Usuario["status"]) => {
    const variants = {
      ativo: { variant: "default" as const, icon: UserCheck, text: "Ativo" },
      inativo: { variant: "destructive" as const, icon: UserX, text: "Inativo" },
      licenca: { variant: "secondary" as const, icon: User, text: "Licença" }
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

  const getNivelBadge = (nivel: Usuario["nivel"]) => {
    const variants = {
      fiscal: { variant: "outline" as const, text: "Fiscal" },
      supervisor: { variant: "secondary" as const, text: "Supervisor" },
      coordenador: { variant: "default" as const, text: "Coordenador" },
      administrador: { variant: "destructive" as const, text: "Administrador" }
    };
    
    return <Badge variant={variants[nivel].variant}>{variants[nivel].text}</Badge>;
  };

  const getSetorBadge = (setor: Usuario["setor"]) => {
    const variants = {
      obras: { text: "Obras", color: "bg-blue-100 text-blue-800" },
      posturas: { text: "Posturas", color: "bg-green-100 text-green-800" },
      terrenos: { text: "Terrenos", color: "bg-yellow-100 text-yellow-800" },
      administracao: { text: "Administração", color: "bg-purple-100 text-purple-800" }
    };
    
    const config = variants[setor];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const filteredUsuarios = usuarios.filter(usuario => {
    const matchesSearch = usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         usuario.cargo.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedTab === "todos") return matchesSearch;
    return matchesSearch && usuario.setor === selectedTab;
  });

  const stats = {
    total: usuarios.length,
    ativos: usuarios.filter(u => u.status === "ativo").length,
    inativos: usuarios.filter(u => u.status === "inativo").length,
    licenca: usuarios.filter(u => u.status === "licenca").length,
    obras: usuarios.filter(u => u.setor === "obras").length,
    posturas: usuarios.filter(u => u.setor === "posturas").length,
    terrenos: usuarios.filter(u => u.setor === "terrenos").length,
    administracao: usuarios.filter(u => u.setor === "administracao").length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Usuários</h1>
          <p className="text-gray-600">Gerencie usuários e permissões do sistema</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Novo Usuário
          </Button>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.ativos}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Licença</CardTitle>
            <User className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.licenca}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inativos</CardTitle>
            <UserX className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.inativos}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-gray-400" />
        <Input
          placeholder="Pesquisar por nome, email ou cargo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Tabs and Table */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="todos">Todos ({stats.total})</TabsTrigger>
          <TabsTrigger value="obras">Obras ({stats.obras})</TabsTrigger>
          <TabsTrigger value="posturas">Posturas ({stats.posturas})</TabsTrigger>
          <TabsTrigger value="terrenos">Terrenos ({stats.terrenos})</TabsTrigger>
          <TabsTrigger value="administracao">Admin ({stats.administracao})</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Usuários</CardTitle>
              <CardDescription>
                {filteredUsuarios.length} usuário(s) encontrado(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Cargo</TableHead>
                    <TableHead>Setor</TableHead>
                    <TableHead>Nível</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Último Acesso</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsuarios.map((usuario) => (
                    <TableRow key={usuario.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {usuario.nome.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </div>
                          <div>
                            <div>{usuario.nome}</div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {usuario.telefone}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          {usuario.email}
                        </div>
                      </TableCell>
                      <TableCell>{usuario.cargo}</TableCell>
                      <TableCell>{getSetorBadge(usuario.setor)}</TableCell>
                      <TableCell>{getNivelBadge(usuario.nivel)}</TableCell>
                      <TableCell>{getStatusBadge(usuario.status)}</TableCell>
                      <TableCell>
                        {usuario.ultimoAcesso ? (
                          <div className="text-sm">
                            <div>{usuario.ultimoAcesso.toLocaleDateString('pt-BR')}</div>
                            <div className="text-gray-500">
                              {usuario.ultimoAcesso.toLocaleTimeString('pt-BR', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400">Nunca</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            Ver Perfil
                          </Button>
                        </div>
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

export default Usuarios;
