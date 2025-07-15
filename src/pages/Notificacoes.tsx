
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NotificacaoForm } from "@/components/NotificacaoForm";
import { NotificacaoTable } from "@/components/NotificacaoTable";
import { Plus, Download, Upload } from "lucide-react";
import { Notificacao } from "@/types/fiscalizacao";
import { toast } from "@/hooks/use-toast";

const Notificacoes = () => {
  const [showForm, setShowForm] = useState(false);
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([
    {
      id: "1",
      numero: "NOT-2024-001234",
      tipo: "notificacao",
      status: "pendente",
      endereco: "Rua das Flores, 123 - Centro",
      contribuinte: "João da Silva Santos",
      cpfCnpj: "123.456.789-00",
      descricao: "Construção sem alvará de obras. Necessário regularização junto à Secretaria de Obras.",
      dataEmissao: new Date("2024-01-15"),
      prazoVencimento: new Date("2024-02-15"),
      fiscal: "Maria Oliveira",
      observacoes: "Proprietário foi notificado pessoalmente"
    },
    {
      id: "2",
      numero: "INT-2024-005678",
      tipo: "intimacao",
      status: "pendente",
      endereco: "Av. Principal, 456 - Jardim América",
      contribuinte: "Comercial ABC Ltda",
      cpfCnpj: "12.345.678/0001-90",
      descricao: "Estabelecimento funcionando fora do horário permitido pela postura municipal.",
      dataEmissao: new Date("2024-01-10"),
      prazoVencimento: new Date("2024-01-25"),
      fiscal: "Carlos Santos",
      valor: 850.00
    },
    {
      id: "3",
      numero: "EMB-2024-009876",
      tipo: "embargo",
      status: "cumprida",
      endereco: "Rua Nova, 789 - Vila Esperança",
      contribuinte: "Construtora XYZ",
      cpfCnpj: "98.765.432/0001-10",
      descricao: "Obra embargada por não atender às normas de segurança e estar sem projeto aprovado.",
      dataEmissao: new Date("2024-01-05"),
      prazoVencimento: new Date("2024-01-20"),
      fiscal: "Ana Costa",
      valor: 2500.00
    }
  ]);

  const handleSubmit = (data: any) => {
    const novaNotificacao: Notificacao = {
      id: Date.now().toString(),
      ...data
    };
    
    setNotificacoes([...notificacoes, novaNotificacao]);
    setShowForm(false);
  };

  const handleView = (id: string) => {
    toast({
      title: "Visualizar",
      description: `Abrindo detalhes da autuação ${id}`,
    });
  };

  const handleEdit = (id: string) => {
    toast({
      title: "Editar",
      description: `Editando autuação ${id}`,
    });
  };

  const handleDelete = (id: string) => {
    setNotificacoes(notificacoes.filter(n => n.id !== id));
    toast({
      title: "Excluído",
      description: "Autuação excluída com sucesso",
    });
  };

  if (showForm) {
    return (
      <div className="p-6">
        <NotificacaoForm 
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Autuações</h1>
          <p className="text-gray-600">Gerencie todas as notificações, intimações, embargos, infrações e multas</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Importar
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nova Autuação
          </Button>
        </div>
      </div>

      {/* Tabela de Notificações */}
      <NotificacaoTable
        notificacoes={notificacoes}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Notificacoes;
