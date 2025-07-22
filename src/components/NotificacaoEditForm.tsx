import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { format, isAfter, addDays } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { toast } from "@/hooks/use-toast";
import { Notificacao } from "@/types/fiscalizacao";
import { Badge } from "@/components/ui/badge";

interface NotificacaoEditFormProps {
  notificacao: Notificacao;
  onSubmit: (data: Notificacao) => void;
  onCancel: () => void;
}

export const NotificacaoEditForm = ({ notificacao, onSubmit, onCancel }: NotificacaoEditFormProps) => {
  const [formData, setFormData] = useState<Notificacao>(notificacao);

  const verificarPrazo = () => {
    const hoje = new Date();
    const vencimento = new Date(formData.prazoVencimento);
    const alertaVencimento = addDays(vencimento, -3);

    if (isAfter(hoje, vencimento)) {
      return { status: "fora_prazo", label: "Fora do prazo", variant: "destructive" as const };
    }
    if (isAfter(hoje, alertaVencimento)) {
      return { status: "vencendo", label: "Vencendo", variant: "secondary" as const };
    }
    return { status: "dentro_prazo", label: "Dentro do prazo", variant: "default" as const };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.tipo || !formData.contribuinte || !formData.cpfCnpj) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);

    toast({
      title: "Sucesso",
      description: "Autuação atualizada com sucesso!",
    });
  };

  const prazoStatus = verificarPrazo();

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Editar Auto - {formData.numero}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações do Auto */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="tipo">Tipo *</Label>
              <Select value={formData.tipo} onValueChange={(value) => setFormData({...formData, tipo: value as any})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="notificacao">Notificação</SelectItem>
                  <SelectItem value="intimacao">Intimação</SelectItem>
                  <SelectItem value="embargo">Embargo</SelectItem>
                  <SelectItem value="multa">Infração</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="dataEmissao">Data de Emissão</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.dataEmissao && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dataEmissao ? format(new Date(formData.dataEmissao), "dd/MM/yyyy") : "Selecione a data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={formData.dataEmissao ? new Date(formData.dataEmissao) : undefined}
                    onSelect={(date) => setFormData({...formData, dataEmissao: date || new Date()})}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label htmlFor="prazoVencimento">Prazo *</Label>
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
                    {formData.prazoVencimento ? format(new Date(formData.prazoVencimento), "dd/MM/yyyy") : "Selecione a data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={formData.prazoVencimento ? new Date(formData.prazoVencimento) : undefined}
                    onSelect={(date) => setFormData({...formData, prazoVencimento: date || new Date()})}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Verificação do Prazo */}
          <div>
            <Label>Verificação do Prazo</Label>
            <div className="mt-2">
              <Badge variant={prazoStatus.variant}>{prazoStatus.label}</Badge>
            </div>
          </div>

          {/* Dados do Imóvel */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Dados do Imóvel</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="inscricaoImobiliaria">Inscrição Imobiliária</Label>
                <Input
                  id="inscricaoImobiliaria"
                  value={formData.inscricaoImobiliaria || ''}
                  onChange={(e) => setFormData({...formData, inscricaoImobiliaria: e.target.value})}
                  placeholder="000.000.00.0000"
                />
              </div>
              <div>
                <Label htmlFor="logradouro">Logradouro</Label>
                <Input
                  id="logradouro"
                  value={formData.logradouro || ''}
                  onChange={(e) => setFormData({...formData, logradouro: e.target.value})}
                  placeholder="Nome da rua"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="numeroEndereco">Número</Label>
                <Input
                  id="numeroEndereco"
                  value={formData.numeroEndereco || ''}
                  onChange={(e) => setFormData({...formData, numeroEndereco: e.target.value})}
                  placeholder="123"
                />
              </div>
              <div>
                <Label htmlFor="bairro">Bairro</Label>
                <Input
                  id="bairro"
                  value={formData.bairro || ''}
                  onChange={(e) => setFormData({...formData, bairro: e.target.value})}
                  placeholder="Nome do bairro"
                />
              </div>
              <div>
                <Label htmlFor="complemento">Complemento</Label>
                <Input
                  id="complemento"
                  value={formData.complemento || ''}
                  onChange={(e) => setFormData({...formData, complemento: e.target.value})}
                  placeholder="Apto, bloco, etc."
                />
              </div>
            </div>
          </div>

          {/* Dados do Autuado */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Dados do Autuado</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contribuinte">Nome do Autuado *</Label>
                <Input
                  id="contribuinte"
                  value={formData.contribuinte}
                  onChange={(e) => setFormData({...formData, contribuinte: e.target.value})}
                  placeholder="Nome completo"
                />
              </div>
              <div>
                <Label htmlFor="cpfCnpj">CPF/CNPJ do Autuado *</Label>
                <Input
                  id="cpfCnpj"
                  value={formData.cpfCnpj}
                  onChange={(e) => setFormData({...formData, cpfCnpj: e.target.value})}
                  placeholder="000.000.000-00"
                />
              </div>
            </div>
          </div>

          {/* Irregularidade */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Irregularidade</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tipoIrregularidade">Tipo de Irregularidade</Label>
                <Select 
                  value={formData.tipoIrregularidade || ''} 
                  onValueChange={(value) => setFormData({...formData, tipoIrregularidade: value as any})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="obra_irregular">Obra Irregular</SelectItem>
                    <SelectItem value="empresa_irregular">Empresa Irregular</SelectItem>
                    <SelectItem value="terreno_sujo">Terreno Sujo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="origemIrregularidade">Origem da Irregularidade</Label>
                <Select 
                  value={formData.origemIrregularidade || ''} 
                  onValueChange={(value) => setFormData({...formData, origemIrregularidade: value as any})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a origem" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="autoconstatacao">Autoconstatação</SelectItem>
                    <SelectItem value="agente_controle_urbano">Agente de Controle Urbano</SelectItem>
                    <SelectItem value="denuncia">Denúncia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="descricao">Descrição da Irregularidade</Label>
              <Textarea
                id="descricao"
                value={formData.descricao}
                onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                placeholder="Descreva detalhadamente a irregularidade encontrada"
                rows={4}
              />
            </div>
          </div>

          {/* Observações e Recursos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                value={formData.observacoes || ''}
                onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
                placeholder="Informações adicionais"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="numeroRecurso">Número do Recurso</Label>
              <Input
                id="numeroRecurso"
                value={formData.numeroRecurso || ''}
                onChange={(e) => setFormData({...formData, numeroRecurso: e.target.value})}
                placeholder="REC-2024-001"
              />
            </div>
          </div>

          {/* Status da Resolução */}
          <div>
            <Label htmlFor="statusResolucao">Status da Resolução</Label>
            <Select 
              value={formData.statusResolucao || ''} 
              onValueChange={(value) => setFormData({...formData, statusResolucao: value as any})}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="resolvido">Resolvido</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.valor && (
            <div>
              <Label htmlFor="valor">Valor da Multa (R$)</Label>
              <Input
                id="valor"
                type="number"
                step="0.01"
                value={formData.valor}
                onChange={(e) => setFormData({...formData, valor: parseFloat(e.target.value)})}
                placeholder="0,00"
              />
            </div>
          )}

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit">
              Salvar Alterações
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};