
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { toast } from "@/hooks/use-toast";

interface NotificacaoFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export const NotificacaoForm = ({ onSubmit, onCancel }: NotificacaoFormProps) => {
  const [formData, setFormData] = useState({
    tipo: '',
    endereco: '',
    contribuinte: '',
    cpfCnpj: '',
    descricao: '',
    prazoVencimento: null as Date | null,
    valor: '',
    observacoes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.tipo || !formData.endereco || !formData.contribuinte || !formData.prazoVencimento) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      ...formData,
      numero: `${formData.tipo.toUpperCase()}-${Date.now()}`,
      dataEmissao: new Date(),
      status: 'pendente',
      fiscal: 'Fiscal Atual' // Em um sistema real, seria o usuário logado
    });

    toast({
      title: "Sucesso",
      description: "Notificação criada com sucesso!",
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Nova Notificação/Intimação</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tipo">Tipo *</Label>
              <Select value={formData.tipo} onValueChange={(value) => setFormData({...formData, tipo: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="notificacao">Notificação</SelectItem>
                  <SelectItem value="intimacao">Intimação</SelectItem>
                  <SelectItem value="embargo">Embargo</SelectItem>
                  <SelectItem value="multa">Multa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="prazoVencimento">Prazo de Vencimento *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.prazoVencimento && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.prazoVencimento ? format(formData.prazoVencimento, "dd/MM/yyyy") : "Selecione a data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={formData.prazoVencimento}
                    onSelect={(date) => setFormData({...formData, prazoVencimento: date})}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div>
            <Label htmlFor="endereco">Endereço *</Label>
            <Input
              id="endereco"
              value={formData.endereco}
              onChange={(e) => setFormData({...formData, endereco: e.target.value})}
              placeholder="Endereço completo da irregularidade"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contribuinte">Nome do Contribuinte *</Label>
              <Input
                id="contribuinte"
                value={formData.contribuinte}
                onChange={(e) => setFormData({...formData, contribuinte: e.target.value})}
                placeholder="Nome completo"
              />
            </div>

            <div>
              <Label htmlFor="cpfCnpj">CPF/CNPJ *</Label>
              <Input
                id="cpfCnpj"
                value={formData.cpfCnpj}
                onChange={(e) => setFormData({...formData, cpfCnpj: e.target.value})}
                placeholder="000.000.000-00"
              />
            </div>
          </div>

          {formData.tipo === 'multa' && (
            <div>
              <Label htmlFor="valor">Valor da Multa (R$)</Label>
              <Input
                id="valor"
                type="number"
                step="0.01"
                value={formData.valor}
                onChange={(e) => setFormData({...formData, valor: e.target.value})}
                placeholder="0,00"
              />
            </div>
          )}

          <div>
            <Label htmlFor="descricao">Descrição da Irregularidade *</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => setFormData({...formData, descricao: e.target.value})}
              placeholder="Descreva detalhadamente a irregularidade encontrada"
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
              placeholder="Informações adicionais"
              rows={2}
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit">
              Criar Notificação
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
