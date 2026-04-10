import { formatCpf, sanitizeCpf } from "../src/utils/cpf";

describe("cpf utils", () => {
  it("sanitizeCpf removes non-digit characters", () => {
    expect(sanitizeCpf("123.456.789-00")).toBe("12345678900");
  });

  it("formatCpf applies the mask progressively", () => {
    expect(formatCpf("12345678900")).toBe("123.456.789-00");
  });
});
