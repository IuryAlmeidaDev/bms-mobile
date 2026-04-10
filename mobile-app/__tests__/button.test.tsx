import { fireEvent, render } from "@testing-library/react-native";

import { Button } from "../src/components/ui/Button";

describe("Button", () => {
  it("renders title and triggers onPress", () => {
    const onPress = jest.fn();
    const screen = render(<Button title="Entrar" onPress={onPress} />);

    fireEvent.press(screen.getByText("Entrar"));

    expect(screen.getByText("Entrar")).toBeTruthy();
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("disables press when loading", () => {
    const onPress = jest.fn();
    const screen = render(<Button title="Salvar" onPress={onPress} loading />);

    fireEvent.press(screen.getByRole("button"));

    expect(onPress).not.toHaveBeenCalled();
  });
});
