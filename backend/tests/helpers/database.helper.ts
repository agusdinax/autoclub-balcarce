import { CircuitModel } from "../../src/modules/circuits/circuit.model";
import { UserModel } from "../../src/modules/users/user.model";

export const cleanupTestDatabase =
  async (): Promise<void> => {
    await CircuitModel.deleteMany({
      slug: /^test-/,
    });

    await UserModel.deleteMany({
      email: /@autoclub\.test$/,
    });
  };