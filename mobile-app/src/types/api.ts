export type User = {
  id: number;
  cpf: string;
  nome: string;
  ativo: boolean;
  roles: string[];
  unidades: string[];
};

export type AuthResponse = {
  message: string;
  token: string;
  user: User;
};

export type LoginPayload = {
  cpf: string;
  senha: string;
};

export type AuthSession = {
  token: string;
  user: User;
};

export type BlocoStatus = "ATIVO" | "INATIVO" | "MANUTENCAO" | "BLOQUEADO";
export type SalaStatus = "LIVRE" | "OCUPADA" | "MANUTENCAO" | "INDISPONIVEL";
export type SalaTipo =
  | "SALA_DE_AULA"
  | "LABORATORIO"
  | "AUDITORIO"
  | "BIBLIOTECA"
  | "ESCRITORIO"
  | "REUNIAO"
  | "COORDENACAO"
  | "SECRETARIA";
export type LuzStatus = "LIGADO" | "DESLIGADO";

export type Bloco = {
  id: number;
  nome: string;
  descricao?: string;
  status: BlocoStatus;
  createdAt?: string;
  updatedAt?: string;
};

export type Sala = {
  id: number;
  nome: string;
  capacidade: number;
  status: SalaStatus;
  tipoSala: SalaTipo;
  blocoId: number;
  blocoNome?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Luz = {
  id: number;
  salaId: number;
  status: LuzStatus;
  salaNome?: string;
  blocoNome?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
  BlocoDetail: { blocoId: number; blocoNome: string };
};

export type MainTabParamList = {
  Dashboard: undefined;
  Blocos: undefined;
  Luzes: undefined;
};
