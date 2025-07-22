
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Edit, Trash2, Search, Calendar, Download } from "lucide-react";
import { format, isAfter, isBefore, addDays } from "date-fns";
import { Notificacao } from "@/types/fiscalizacao";
import jsPDF from 'jspdf';

interface NotificacaoTableProps {
  notificacoes: Notificacao[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const NotificacaoTable = ({ notificacoes, onView, onEdit, onDelete }: NotificacaoTableProps) => {
  const [filtro, setFiltro] = useState('');
  const [statusFiltro, setStatusFiltro] = useState('todos');

  const getStatusBadge = (notificacao: Notificacao) => {
    const hoje = new Date();
    const vencimento = new Date(notificacao.prazoVencimento);
    const alertaVencimento = addDays(vencimento, -3);

    if (notificacao.status === 'cumprida') {
      return <Badge variant="default" className="bg-green-100 text-green-800">Cumprida</Badge>;
    }
    if (notificacao.status === 'cancelada') {
      return <Badge variant="secondary">Cancelada</Badge>;
    }
    if (isBefore(hoje, vencimento) && isAfter(hoje, alertaVencimento)) {
      return <Badge variant="destructive" className="bg-yellow-100 text-yellow-800">Vencendo</Badge>;
    }
    if (isAfter(hoje, vencimento)) {
      return <Badge variant="destructive">Vencida</Badge>;
    }
    return <Badge variant="outline">Pendente</Badge>;
  };

  const getTipoBadge = (tipo: string) => {
    const cores = {
      notificacao: 'bg-blue-100 text-blue-800',
      intimacao: 'bg-orange-100 text-orange-800',
      embargo: 'bg-red-100 text-red-800',
      multa: 'bg-purple-100 text-purple-800'
    };

    return (
      <Badge className={cores[tipo as keyof typeof cores] || 'bg-gray-100 text-gray-800'}>
        {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
      </Badge>
    );
  };

  const generatePDF = (notificacao: Notificacao) => {
    const doc = new jsPDF();
    
    // Configurações do PDF
    doc.setFont('helvetica');
    
    // Adicionar imagem do brasão (simulando - em produção seria carregada do assets)
    // Para incluir a imagem, seria necessário converter para base64 primeiro
    
    // Cabeçalho
    doc.setFontSize(18);
    doc.text('MUNICÍPIO DE ITAJAÍ', 105, 30, { align: 'center' });
    doc.setFontSize(14);
    doc.text('SECRETARIA DE FISCALIZAÇÃO', 105, 40, { align: 'center' });
    
    // Tipo de documento
    const tipoDoc = notificacao.tipo.charAt(0).toUpperCase() + notificacao.tipo.slice(1);
    doc.setFontSize(16);
    doc.text(`AUTO DE ${tipoDoc.toUpperCase()}`, 105, 55, { align: 'center' });
    
    // Linha separadora
    doc.line(20, 65, 190, 65);
    
    // Estrutura da autuação conforme solicitado
    let yPos = 80;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('DADOS DA AUTUAÇÃO:', 20, yPos);
    doc.setFont('helvetica', 'normal');
    
    yPos += 15;
    doc.text(`Número do Auto: ${notificacao.numero}`, 20, yPos);
    
    yPos += 10;
    doc.text(`Data de Emissão: ${format(new Date(notificacao.dataEmissao), 'dd/MM/yyyy')}`, 20, yPos);
    
    yPos += 10;
    doc.text(`Prazo para Cumprimento: ${format(new Date(notificacao.prazoVencimento), 'dd/MM/yyyy')}`, 20, yPos);
    
    yPos += 10;
    doc.text(`Tipo de Irregularidade: ${notificacao.tipo.charAt(0).toUpperCase() + notificacao.tipo.slice(1)}`, 20, yPos);
    
    // Dados do infrator
    yPos += 20;
    doc.setFont('helvetica', 'bold');
    doc.text('DADOS DO INFRATOR:', 20, yPos);
    doc.setFont('helvetica', 'normal');
    
    yPos += 15;
    doc.text(`Nome do Infrator: ${notificacao.contribuinte}`, 20, yPos);
    
    yPos += 10;
    doc.text(`CPF/CNPJ do Infrator: ${notificacao.cpfCnpj}`, 20, yPos);
    
    yPos += 10;
    doc.text(`Endereço: ${notificacao.endereco}`, 20, yPos);
    
    // Descrição da irregularidade
    yPos += 20;
    doc.setFont('helvetica', 'bold');
    doc.text('DESCRIÇÃO DA IRREGULARIDADE:', 20, yPos);
    doc.setFont('helvetica', 'normal');
    yPos += 10;
    
    // Quebrar texto longo em múltiplas linhas
    const splitText = doc.splitTextToSize(notificacao.descricao, 170);
    doc.text(splitText, 20, yPos);
    yPos += splitText.length * 6;
    
    // Embasamento legal (campo padrão para autuações)
    yPos += 15;
    doc.setFont('helvetica', 'bold');
    doc.text('EMBASAMENTO LEGAL:', 20, yPos);
    doc.setFont('helvetica', 'normal');
    yPos += 10;
    doc.text('Lei Complementar Municipal nº 123/2006 - Código de Posturas', 20, yPos);
    yPos += 8;
    doc.text('Lei Municipal nº 456/2010 - Código de Obras e Edificações', 20, yPos);
    
    // Dados do fiscal
    yPos += 20;
    doc.setFont('helvetica', 'bold');
    doc.text('FISCAL RESPONSÁVEL:', 20, yPos);
    doc.setFont('helvetica', 'normal');
    yPos += 15;
    doc.text(`Nome do Fiscal: ${notificacao.fiscal}`, 20, yPos);
    
    yPos += 10;
    // Matrícula simulada baseada no nome do fiscal
    const matricula = notificacao.fiscal.split(' ').map(n => n.charAt(0)).join('').toUpperCase() + '001';
    doc.text(`Matrícula: ${matricula}`, 20, yPos);
    
    // Valor da multa (se houver)
    if (notificacao.valor) {
      yPos += 15;
      doc.setFont('helvetica', 'bold');
      doc.text('VALOR DA MULTA:', 20, yPos);
      doc.setFont('helvetica', 'normal');
      yPos += 10;
      doc.text(`R$ ${notificacao.valor.toFixed(2).replace('.', ',')}`, 20, yPos);
    }
    
    // Observações (se houver)
    if (notificacao.observacoes) {
      yPos += 20;
      doc.setFont('helvetica', 'bold');
      doc.text('OBSERVAÇÕES:', 20, yPos);
      doc.setFont('helvetica', 'normal');
      yPos += 10;
      const splitObs = doc.splitTextToSize(notificacao.observacoes, 170);
      doc.text(splitObs, 20, yPos);
    }
    
    // Rodapé
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(10);
    doc.text('Este documento foi gerado automaticamente pelo Sistema de Fiscalização Municipal de Itajaí', 105, pageHeight - 30, { align: 'center' });
    doc.text(`Gerado em: ${format(new Date(), 'dd/MM/yyyy HH:mm')}`, 105, pageHeight - 20, { align: 'center' });
    doc.text('Município de Itajaí - SC', 105, pageHeight - 10, { align: 'center' });
    
    // Salvar o PDF
    doc.save(`Auto_${notificacao.numero.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
  };

  const notificacoesFiltradas = notificacoes.filter(notificacao => {
    const matchFiltro = notificacao.contribuinte.toLowerCase().includes(filtro.toLowerCase()) ||
                       notificacao.endereco.toLowerCase().includes(filtro.toLowerCase()) ||
                       notificacao.numero.toLowerCase().includes(filtro.toLowerCase());
    
    const matchStatus = statusFiltro === 'todos' || notificacao.status === statusFiltro;
    
    return matchFiltro && matchStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar por contribuinte, endereço ou número..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFiltro} onValueChange={setStatusFiltro}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os Status</SelectItem>
            <SelectItem value="pendente">Pendente</SelectItem>
            <SelectItem value="cumprida">Cumprida</SelectItem>
            <SelectItem value="vencida">Vencida</SelectItem>
            <SelectItem value="cancelada">Cancelada</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Número</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Contribuinte</TableHead>
              <TableHead>Endereço</TableHead>
              <TableHead>Vencimento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notificacoesFiltradas.map((notificacao) => (
              <TableRow key={notificacao.id}>
                <TableCell className="font-medium">{notificacao.numero}</TableCell>
                <TableCell>{getTipoBadge(notificacao.tipo)}</TableCell>
                <TableCell>{notificacao.contribuinte}</TableCell>
                <TableCell className="max-w-xs truncate">{notificacao.endereco}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    {format(new Date(notificacao.prazoVencimento), 'dd/MM/yyyy')}
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(notificacao)}</TableCell>
                <TableCell>
                  {notificacao.valor ? `R$ ${notificacao.valor.toFixed(2)}` : '-'}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-1 justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(notificacao.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => generatePDF(notificacao)}
                      className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(notificacao.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(notificacao.id)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {notificacoesFiltradas.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Nenhuma notificação encontrada
        </div>
      )}
    </div>
  );
};
