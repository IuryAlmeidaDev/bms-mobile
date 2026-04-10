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
export type UnidadeTipo = "CENTRAL" | "ADMINISTRATIVA";

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

export type UserResponse = {
  id: number;
  cpf: string;
  nome: string;
  ativo: boolean;
  roles: string[];
  unidades: string[];
};

export type UnidadeResponse = {
  id: number;
  nome: string;
  tipo: UnidadeTipo;
  ativo: boolean;
};

export type RoleResponse = {
  id: number;
  nome: string;
  permissions: string[];
};

export type PermissionResponse = {
  id: number;
  nome: string;
};

export type AuditEntry = Record<string, unknown>;

export type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
  BlocoDetail: { blocoId: number; blocoNome: string };
};

export type MainTabParamList = {
  Dashboard: undefined;
  Blocos: undefined;
  Luzes: undefined;
  Admin: undefined;
};
