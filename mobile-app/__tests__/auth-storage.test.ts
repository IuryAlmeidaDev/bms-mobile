jest.mock("expo-secure-store", () => ({
  setItemAsync: jest.fn(),
  getItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

import * as SecureStore from "expo-secure-store";

import { clearSession, getSession, saveSession } from "../src/services/storage/auth-storage";

describe("auth storage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("saves session payload in secure store", async () => {
    await saveSession({
      token: "jwt-token",
      user: {
        id: 1,
        cpf: "12345678900",
        nome: "Teste",
        ativo: true,
        roles: ["ADMIN"],
        unidades: ["Central"],
      },
    });

    expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
      "iot-mobile-auth-session",
      expect.stringContaining("jwt-token"),
    );
  });

  it("returns null when there is no stored session", async () => {
    jest.mocked(SecureStore.getItemAsync).mockResolvedValueOnce(null);

    await expect(getSession()).resolves.toBeNull();
  });

  it("clears persisted session", async () => {
    await clearSession();

    expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith(
      "iot-mobile-auth-session",
    );
  });
});
