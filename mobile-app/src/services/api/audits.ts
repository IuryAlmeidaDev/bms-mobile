import { api } from "./client";
import { AuditEntry } from "../../types/api";

export async function listAudits() {
  const { data } = await api.get<AuditEntry[]>("/api/audits");
  return data;
}
