import { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Alert } from "../components/ui/Alert";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Screen } from "../components/ui/Screen";
import { colors, spacing } from "../constants/theme";
import * as auditsApi from "../services/api/audits";
import * as blocosApi from "../services/api/blocos";
import * as luzesApi from "../services/api/luzes";
import * as permissionsApi from "../services/api/permissions";
import * as rolesApi from "../services/api/roles";
import * as salasApi from "../services/api/salas";
import * as unidadesApi from "../services/api/unidades";
import * as usersApi from "../services/api/users";
import { BlocoStatus, SalaStatus, SalaTipo, UnidadeTipo } from "../types/api";
import { getErrorMessage } from "../utils/api-error";

const BLOCO_STATUS: BlocoStatus[] = ["ATIVO", "INATIVO", "MANUTENCAO", "BLOQUEADO"];
const SALA_STATUS: SalaStatus[] = ["LIVRE", "OCUPADA", "MANUTENCAO", "INDISPONIVEL"];
const SALA_TIPOS: SalaTipo[] = [
  "SALA_DE_AULA",
  "LABORATORIO",
  "AUDITORIO",
  "BIBLIOTECA",
  "ESCRITORIO",
  "REUNIAO",
  "COORDENACAO",
  "SECRETARIA",
];
const UNIDADE_TIPOS: UnidadeTipo[] = ["CENTRAL", "ADMINISTRATIVA"];

export function AdminScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultTitle, setResultTitle] = useState("Nenhuma acao executada.");
  const [resultBody, setResultBody] = useState("Use os botoes abaixo para administrar o sistema.");

  const [blocoId, setBlocoId] = useState("1");
  const [blocoNome, setBlocoNome] = useState("Bloco Teste");
  const [blocoDescricao, setBlocoDescricao] = useState("Criado via app");
  const [blocoStatus, setBlocoStatus] = useState<BlocoStatus>("ATIVO");

  const [salaId, setSalaId] = useState("1");
  const [salaNome, setSalaNome] = useState("Sala 101");
  const [salaCapacidade, setSalaCapacidade] = useState("30");
  const [salaStatus, setSalaStatus] = useState<SalaStatus>("LIVRE");
  const [salaTipo, setSalaTipo] = useState<SalaTipo>("SALA_DE_AULA");

  const [luzId, setLuzId] = useState("1");
  const [luzSalaId, setLuzSalaId] = useState("1");
  const [luzStatus, setLuzStatus] = useState<"LIGADO" | "DESLIGADO">("DESLIGADO");

  const [userId, setUserId] = useState("1");
  const [userNome, setUserNome] = useState("Usuario Admin");
  const [userCpf, setUserCpf] = useState("52998224725");
  const [userSenha, setUserSenha] = useState("Teste@123");

  const [unidadeId, setUnidadeId] = useState("1");
  const [unidadeNome, setUnidadeNome] = useState("Unidade Central");
  const [unidadeTipo, setUnidadeTipo] = useState<UnidadeTipo>("CENTRAL");

  const [roleId, setRoleId] = useState("1");
  const [roleNome, setRoleNome] = useState("OPERADOR");
  const [permissionId, setPermissionId] = useState("1");
  const [permissionNome, setPermissionNome] = useState("BLOCO_WRITE");

  const [filtroNome, setFiltroNome] = useState("");
  const [filtroCapacidade, setFiltroCapacidade] = useState("20");

  const ids = useMemo(
    () => ({
      blocoId: toNumber(blocoId),
      salaId: toNumber(salaId),
      luzId: toNumber(luzId),
      luzSalaId: toNumber(luzSalaId),
      userId: toNumber(userId),
      unidadeId: toNumber(unidadeId),
      roleId: toNumber(roleId),
      permissionId: toNumber(permissionId),
      capacidade: toNumber(filtroCapacidade),
      salaCapacidade: toNumber(salaCapacidade),
    }),
    [
      blocoId,
      filtroCapacidade,
      luzId,
      luzSalaId,
      permissionId,
      roleId,
      salaCapacidade,
      salaId,
      unidadeId,
      userId,
    ],
  );

  async function runAction(actionName: string, action: () => Promise<unknown>) {
    setLoading(true);
    setError(null);
    try {
      const data = await action();
      setResultTitle(actionName);
      setResultBody(formatResult(data));
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <Card>
        <CardHeader>
          <CardTitle>Painel Administrativo</CardTitle>
          <CardDescription>
            Gerencie blocos, salas, luzes, usuarios, unidades, papeis, permissoes e auditoria de forma simples.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error ? <Alert tone="error" title="Nao foi possivel concluir" description={error} /> : null}
          {loading ? <Text style={styles.loading}>Processando...</Text> : null}
          <Text style={styles.resultTitle}>{resultTitle}</Text>
          <Text style={styles.resultBody}>{resultBody}</Text>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Blocos</CardTitle>
          <CardDescription>Cadastre, edite, desative e consulte blocos.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input label="ID do bloco" value={blocoId} onChangeText={setBlocoId} keyboardType="numeric" inputMode="numeric" />
          <Input label="Nome do bloco" value={blocoNome} onChangeText={setBlocoNome} />
          <Input label="Descricao" value={blocoDescricao} onChangeText={setBlocoDescricao} />
          <Input label={`Status (${BLOCO_STATUS.join(" | ")})`} value={blocoStatus} onChangeText={(v) => setBlocoStatus((v as BlocoStatus) || "ATIVO")} />
          <Button title="Listar blocos" onPress={() => runAction("Lista de blocos carregada", () => blocosApi.listBlocos())} />
          <Button title="Buscar bloco por ID" variant="secondary" onPress={() => runAction("Bloco carregado", () => blocosApi.getBloco(ids.blocoId))} />
          <Button title="Criar bloco" onPress={() => runAction("Bloco criado", () => blocosApi.createBloco({ nome: blocoNome, descricao: blocoDescricao, status: blocoStatus }))} />
          <Button title="Atualizar bloco" variant="secondary" onPress={() => runAction("Bloco atualizado", () => blocosApi.updateBloco(ids.blocoId, { nome: blocoNome, descricao: blocoDescricao, status: blocoStatus }))} />
          <Button title="Alterar status do bloco" onPress={() => runAction("Status do bloco atualizado", () => blocosApi.updateBlocoStatus(ids.blocoId, blocoStatus))} />
          <Button title="Listar blocos por status" variant="secondary" onPress={() => runAction("Filtro de blocos aplicado", () => blocosApi.listBlocosByStatus(blocoStatus))} />
          <Button title="Listar blocos ativos" onPress={() => runAction("Blocos ativos carregados", () => blocosApi.listBlocosAtivos())} />
          <Button title="Excluir bloco" variant="destructive" onPress={() => runAction("Bloco removido", () => blocosApi.deleteBloco(ids.blocoId))} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Salas</CardTitle>
          <CardDescription>Gerencie salas, filtros e disponibilidade.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input label="ID da sala" value={salaId} onChangeText={setSalaId} keyboardType="numeric" inputMode="numeric" />
          <Input label="Nome da sala" value={salaNome} onChangeText={setSalaNome} />
          <Input label="Capacidade" value={salaCapacidade} onChangeText={setSalaCapacidade} keyboardType="numeric" inputMode="numeric" />
          <Input label="ID do bloco" value={blocoId} onChangeText={setBlocoId} keyboardType="numeric" inputMode="numeric" />
          <Input label={`Status (${SALA_STATUS.join(" | ")})`} value={salaStatus} onChangeText={(v) => setSalaStatus((v as SalaStatus) || "LIVRE")} />
          <Input label={`Tipo (${SALA_TIPOS.join(" | ")})`} value={salaTipo} onChangeText={(v) => setSalaTipo((v as SalaTipo) || "SALA_DE_AULA")} />
          <Input label="Filtro por nome" value={filtroNome} onChangeText={setFiltroNome} />
          <Input label="Filtro por capacidade" value={filtroCapacidade} onChangeText={setFiltroCapacidade} keyboardType="numeric" inputMode="numeric" />
          <Button title="Listar salas" onPress={() => runAction("Lista de salas carregada", () => salasApi.listSalas())} />
          <Button title="Buscar sala por ID" variant="secondary" onPress={() => runAction("Sala carregada", () => salasApi.getSala(ids.salaId))} />
          <Button title="Criar sala" onPress={() => runAction("Sala criada", () => salasApi.createSala({ nome: salaNome, capacidade: ids.salaCapacidade, status: salaStatus, tipoSala: salaTipo, blocoId: ids.blocoId }))} />
          <Button title="Atualizar sala" variant="secondary" onPress={() => runAction("Sala atualizada", () => salasApi.updateSala(ids.salaId, { nome: salaNome, capacidade: ids.salaCapacidade, status: salaStatus, tipoSala: salaTipo, blocoId: ids.blocoId }))} />
          <Button title="Alterar status da sala" onPress={() => runAction("Status da sala atualizado", () => salasApi.updateSalaStatus(ids.salaId, salaStatus))} />
          <Button title="Filtrar por tipo" variant="secondary" onPress={() => runAction("Filtro por tipo aplicado", () => salasApi.listSalasByTipo(salaTipo))} />
          <Button title="Filtrar por status" onPress={() => runAction("Filtro por status aplicado", () => salasApi.listSalasByStatus(salaStatus))} />
          <Button title="Listar salas livres" variant="secondary" onPress={() => runAction("Salas livres carregadas", () => salasApi.listSalasLivres())} />
          <Button title="Salas livres por capacidade" onPress={() => runAction("Filtro de salas livres por capacidade", () => salasApi.listSalasLivresByCapacidade(ids.capacidade))} />
          <Button title="Busca com filtros avancados" variant="secondary" onPress={() => runAction("Busca avancada aplicada", () => salasApi.listSalasPorFiltros({ nome: filtroNome || undefined, blocoId: ids.blocoId, tipoSala: salaTipo, status: salaStatus, capacidadeMinima: ids.capacidade }))} />
          <Button title="Salas por capacidade minima" onPress={() => runAction("Filtro por capacidade minima", () => salasApi.listSalasByCapacidade(ids.capacidade))} />
          <Button title="Buscar sala por nome" variant="secondary" onPress={() => runAction("Busca por nome concluida", () => salasApi.buscarSalasPorNome(filtroNome || salaNome))} />
          <Button title="Listar salas do bloco" onPress={() => runAction("Salas do bloco carregadas", () => salasApi.listSalasByBloco(ids.blocoId))} />
          <Button title="Contar salas livres do bloco" variant="secondary" onPress={() => runAction("Contagem de salas livres concluida", () => salasApi.contarSalasLivresPorBloco(ids.blocoId))} />
          <Button title="Excluir sala" variant="destructive" onPress={() => runAction("Sala removida", () => salasApi.deleteSala(ids.salaId))} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Luzes</CardTitle>
          <CardDescription>Controle individual e em lote por bloco.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input label="ID da luz" value={luzId} onChangeText={setLuzId} keyboardType="numeric" inputMode="numeric" />
          <Input label="ID da sala" value={luzSalaId} onChangeText={setLuzSalaId} keyboardType="numeric" inputMode="numeric" />
          <Input label="Status (LIGADO | DESLIGADO)" value={luzStatus} onChangeText={(v) => setLuzStatus(v === "LIGADO" ? "LIGADO" : "DESLIGADO")} />
          <Button title="Buscar luz por ID" onPress={() => runAction("Luz carregada", () => luzesApi.getLuz(ids.luzId))} />
          <Button title="Criar luz" variant="secondary" onPress={() => runAction("Luz criada", () => luzesApi.createLuz({ salaId: ids.luzSalaId, status: luzStatus }))} />
          <Button title="Atualizar luz" onPress={() => runAction("Luz atualizada", () => luzesApi.updateLuz(ids.luzId, { salaId: ids.luzSalaId, status: luzStatus }))} />
          <Button title="Ligar luz" variant="secondary" onPress={() => runAction("Luz ligada", () => luzesApi.ligarLuz(ids.luzId))} />
          <Button title="Desligar luz" onPress={() => runAction("Luz desligada", () => luzesApi.desligarLuz(ids.luzId))} />
          <Button title="Ligar todas as luzes do bloco" variant="secondary" onPress={() => runAction("Luzes do bloco ligadas", () => luzesApi.ligarLuzesDoBloco(ids.blocoId))} />
          <Button title="Desligar todas as luzes do bloco" onPress={() => runAction("Luzes do bloco desligadas", () => luzesApi.desligarLuzesDoBloco(ids.blocoId))} />
          <Button title="Excluir luz" variant="destructive" onPress={() => runAction("Luz removida", () => luzesApi.deleteLuz(ids.luzId))} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usuarios</CardTitle>
          <CardDescription>Gestao de pessoas, papeis e unidades.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input label="ID do usuario" value={userId} onChangeText={setUserId} keyboardType="numeric" inputMode="numeric" />
          <Input label="CPF" value={userCpf} onChangeText={setUserCpf} />
          <Input label="Nome" value={userNome} onChangeText={setUserNome} />
          <Input label="Senha" value={userSenha} onChangeText={setUserSenha} secureTextEntry />
          <Input label="ID da unidade" value={unidadeId} onChangeText={setUnidadeId} keyboardType="numeric" inputMode="numeric" />
          <Input label="ID do papel" value={roleId} onChangeText={setRoleId} keyboardType="numeric" inputMode="numeric" />
          <Button title="Listar usuarios" onPress={() => runAction("Lista de usuarios carregada", () => usersApi.listUsers())} />
          <Button title="Criar usuario" variant="secondary" onPress={() => runAction("Usuario criado", () => usersApi.createUser({ cpf: userCpf, nome: userNome, senha: userSenha, ativo: true }))} />
          <Button title="Atualizar nome do usuario" onPress={() => runAction("Usuario atualizado", () => usersApi.updateUser(ids.userId, { nome: userNome }))} />
          <Button title="Vincular unidade ao usuario" variant="secondary" onPress={() => runAction("Unidade vinculada", () => usersApi.assignUnidadeToUser(ids.userId, ids.unidadeId))} />
          <Button title="Remover unidade do usuario" onPress={() => runAction("Unidade removida do usuario", () => usersApi.removeUnidadeFromUser(ids.userId, ids.unidadeId))} />
          <Button title="Vincular papel ao usuario" variant="secondary" onPress={() => runAction("Papel vinculado", () => usersApi.assignRoleToUser(ids.userId, ids.roleId))} />
          <Button title="Remover papel do usuario" onPress={() => runAction("Papel removido do usuario", () => usersApi.removeRoleFromUser(ids.userId, ids.roleId))} />
          <Button title="Ativar usuario" variant="secondary" onPress={() => runAction("Usuario ativado", () => usersApi.activateUser(ids.userId))} />
          <Button title="Desativar usuario" variant="destructive" onPress={() => runAction("Usuario desativado", () => usersApi.deactivateUser(ids.userId))} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Unidades</CardTitle>
          <CardDescription>Estrutura organizacional da instituicao.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input label="ID da unidade" value={unidadeId} onChangeText={setUnidadeId} keyboardType="numeric" inputMode="numeric" />
          <Input label="Nome da unidade" value={unidadeNome} onChangeText={setUnidadeNome} />
          <Input label={`Tipo (${UNIDADE_TIPOS.join(" | ")})`} value={unidadeTipo} onChangeText={(v) => setUnidadeTipo((v as UnidadeTipo) || "CENTRAL")} />
          <Button title="Listar unidades" onPress={() => runAction("Lista de unidades carregada", () => unidadesApi.listUnidades())} />
          <Button title="Criar unidade" variant="secondary" onPress={() => runAction("Unidade criada", () => unidadesApi.createUnidade({ nome: unidadeNome, tipo: unidadeTipo, ativo: true }))} />
          <Button title="Atualizar unidade" onPress={() => runAction("Unidade atualizada", () => unidadesApi.updateUnidade(ids.unidadeId, { nome: unidadeNome, tipo: unidadeTipo }))} />
          <Button title="Ativar unidade" variant="secondary" onPress={() => runAction("Unidade ativada", () => unidadesApi.activateUnidade(ids.unidadeId))} />
          <Button title="Desativar unidade" variant="destructive" onPress={() => runAction("Unidade desativada", () => unidadesApi.deactivateUnidade(ids.unidadeId))} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Papeis e permissoes</CardTitle>
          <CardDescription>Controle de acesso do sistema.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input label="ID do papel" value={roleId} onChangeText={setRoleId} keyboardType="numeric" inputMode="numeric" />
          <Input label="Nome do papel" value={roleNome} onChangeText={setRoleNome} />
          <Input label="ID da permissao" value={permissionId} onChangeText={setPermissionId} keyboardType="numeric" inputMode="numeric" />
          <Input label="Nome da permissao" value={permissionNome} onChangeText={setPermissionNome} />
          <Button title="Listar papeis" onPress={() => runAction("Lista de papeis carregada", () => rolesApi.listRoles())} />
          <Button title="Criar papel" variant="secondary" onPress={() => runAction("Papel criado", () => rolesApi.createRole({ nome: roleNome }))} />
          <Button title="Vincular permissao ao papel" onPress={() => runAction("Permissao vinculada ao papel", () => rolesApi.assignPermissionToRole(ids.roleId, ids.permissionId))} />
          <Button title="Listar permissoes" variant="secondary" onPress={() => runAction("Lista de permissoes carregada", () => permissionsApi.listPermissions())} />
          <Button title="Criar permissao" onPress={() => runAction("Permissao criada", () => permissionsApi.createPermission({ nome: permissionNome }))} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Auditoria</CardTitle>
          <CardDescription>Historico de atividades do sistema.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button title="Listar registros de auditoria" onPress={() => runAction("Auditoria carregada", () => auditsApi.listAudits())} />
        </CardContent>
      </Card>
    </Screen>
  );
}

function toNumber(value: string) {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : 1;
}

function formatResult(data: unknown) {
  if (Array.isArray(data)) {
    return `Foram encontrados ${data.length} registro(s).\n\n${JSON.stringify(data, null, 2)}`;
  }

  if (typeof data === "object" && data !== null) {
    return JSON.stringify(data, null, 2);
  }

  return String(data);
}

const styles = StyleSheet.create({
  loading: {
    color: colors.primary,
    fontWeight: "700",
  },
  resultTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "800",
  },
  resultBody: {
    color: colors.mutedText,
    fontFamily: "monospace",
    fontSize: 12,
    lineHeight: 18,
  },
  row: {
    flexDirection: "row",
    gap: spacing.sm,
  },
});
