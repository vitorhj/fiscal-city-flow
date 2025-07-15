
export interface Usuario {
  id: string;
  nome: string;
  email: string;
  perfil: 'fiscal' | 'supervisor' | 'administrador';
  setor: string;
  ativo: boolean;
}

export interface Notificacao {
  id: string;
  numero: string;
  tipo: 'notificacao' | 'intimacao' | 'embargo' | 'multa';
  status: 'pendente' | 'cumprida' | 'vencida' | 'cancelada';
  endereco: string;
  contribuinte: string;
  cpfCnpj: string;
  descricao: string;
  dataEmissao: Date;
  prazoVencimento: Date;
  fiscal: string;
  valor?: number;
  observacoes?: string;
}

export interface ObraIrregular {
  id: string;
  endereco: string;
  proprietario: string;
  cpfCnpj: string;
  tipoIrregularidade: string;
  descricao: string;
  status: 'identificada' | 'notificada' | 'embargada' | 'regularizada';
  dataIdentificacao: Date;
  fiscal: string;
  fotos?: string[];
  coordenadas?: {
    lat: number;
    lng: number;
  };
}

export interface Infracao {
  id: string;
  codigo: string;
  descricao: string;
  categoria: 'obras' | 'posturas' | 'meio_ambiente' | 'sanitaria';
  valor: number;
  prazoRegularizacao: number; // em dias
  ativo: boolean;
}

export interface DashboardStats {
  totalNotificacoes: number;
  notificacoesPendentes: number;
  obrasIrregulares: number;
  multasEmitidas: number;
  valorTotalMultas: number;
  prazoVencendoHoje: number;
}
