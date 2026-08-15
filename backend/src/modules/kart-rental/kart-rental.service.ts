import { CircuitModel } from "../circuits/circuit.model";

import { ConflictError } from "../../errors/conflict-error";
import { NotFoundError } from "../../errors/not-found-error";

import { KartRentalModel } from "./kart-rental.model";
import {
  CreateKartRentalInput,
  UpdateKartRentalInput,
} from "./kart-rental.schema";

export const createKartRental = async (
  data: CreateKartRentalInput,
) => {
  // 1. Verify circuit
  const circuit = await CircuitModel.findById(
    data.circuit,
  );

  if (!circuit) {
    throw new NotFoundError(
      "Circuit not found",
      "CIRCUIT_NOT_FOUND",
    );
  }

  // 2. Verify circuit is a kartodrome
  if (circuit.type !== "KARTODROMO") {
    throw new ConflictError(
      "Kart rental is only available for kartodromes",
      "INVALID_KART_RENTAL_CIRCUIT",
    );
  }

  // 3. Verify rental configuration does not already exist
  const existingRental =
    await KartRentalModel.findOne({
      circuit: data.circuit,
    });

  if (existingRental) {
    throw new ConflictError(
      "Kart rental configuration already exists for this circuit",
      "KART_RENTAL_ALREADY_EXISTS",
    );
  }

  // 4. Create rental configuration
  return KartRentalModel.create(data);
};

export const getKartRentals = async () => {
  return KartRentalModel.find()
    .populate("circuit")
    .sort({ createdAt: -1 })
    .lean();
};

export const getKartRentalById = async (
  id: string,
) => {
  return KartRentalModel.findById(id)
    .populate("circuit")
    .lean();
};

export const updateKartRental = async (
  id: string,
  data: UpdateKartRentalInput,
) => {
  // 1. Verify rental exists
  const rental =
    await KartRentalModel.findById(id);

  if (!rental) {
    throw new NotFoundError(
      "Kart rental configuration not found",
      "KART_RENTAL_NOT_FOUND",
    );
  }

  // 2. Determine final circuit
  const circuitId =
    data.circuit ?? rental.circuit.toString();

  // 3. Verify circuit
  const circuit =
    await CircuitModel.findById(circuitId);

  if (!circuit) {
    throw new NotFoundError(
      "Circuit not found",
      "CIRCUIT_NOT_FOUND",
    );
  }

  // 4. Verify circuit is a kartodrome
  if (circuit.type !== "KARTODROMO") {
    throw new ConflictError(
      "Kart rental is only available for kartodromes",
      "INVALID_KART_RENTAL_CIRCUIT",
    );
  }

  // 5. If circuit changes, verify there isn't
  // another rental configuration for it.
  if (
    circuitId !==
    rental.circuit.toString()
  ) {
    const existingRental =
      await KartRentalModel.findOne({
        circuit: circuitId,
        _id: { $ne: id },
      });

    if (existingRental) {
      throw new ConflictError(
        "Kart rental configuration already exists for this circuit",
        "KART_RENTAL_ALREADY_EXISTS",
      );
    }
  }

  // 6. Update
  return KartRentalModel.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    },
  )
    .populate("circuit")
    .lean();
};

export const deleteKartRental = async (
  id: string,
) => {
  const rental =
    await KartRentalModel.findByIdAndDelete(
      id,
    );

  if (!rental) {
    throw new NotFoundError(
      "Kart rental configuration not found",
      "KART_RENTAL_NOT_FOUND",
    );
  }

  return rental;
};