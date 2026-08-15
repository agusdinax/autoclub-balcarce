import { CircuitModel } from "../circuits/circuit.model";
import { CircuitLayoutModel } from "../circuit-layouts/circuit-layout.model";
import { CategoryModel } from "../categories/category.model";

import { ConflictError } from "../../errors/conflict-error";
import { NotFoundError } from "../../errors/not-found-error";

import { EventModel } from "./event.model";
import {
  CreateEventInput,
  UpdateEventInput,
} from "./event.schema";
import {
  EventStatus,
  EventType,
} from "./event.types";

interface EventFilters {
  type?: EventType;
  status?: EventStatus;
  circuit?: string;
  from?: Date;
  to?: Date;
}

export const createEvent = async (
  data: CreateEventInput,
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

  // 2. Verify layout
  const layout =
    await CircuitLayoutModel.findById(
      data.layout,
    );

  if (!layout) {
    throw new NotFoundError(
      "Circuit layout not found",
      "CIRCUIT_LAYOUT_NOT_FOUND",
    );
  }

  // 3. Verify layout belongs to circuit
  if (
    layout.circuit.toString() !==
    circuit._id.toString()
  ) {
    throw new ConflictError(
      "Circuit layout does not belong to the selected circuit",
      "LAYOUT_CIRCUIT_MISMATCH",
    );
  }

  // 4. Verify categories
  const categories =
    await CategoryModel.find({
      _id: {
        $in: data.categories,
      },
    });

  if (
    categories.length !==
    data.categories.length
  ) {
    throw new NotFoundError(
      "One or more categories were not found",
      "CATEGORY_NOT_FOUND",
    );
  }

  // 5. Verify categories belong to circuit
  const invalidCategory = categories.find(
    (category) =>
      category.circuit.toString() !==
      circuit._id.toString(),
  );

  if (invalidCategory) {
    throw new ConflictError(
      "One or more categories do not belong to the selected circuit",
      "CATEGORY_CIRCUIT_MISMATCH",
    );
  }

  // 6. Create event
  return EventModel.create(data);
};

export const getEvents = async (
  filters: EventFilters,
) => {
  const query: Record<string, unknown> = {};

  if (filters.type) {
    query.type = filters.type;
  }

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.circuit) {
    query.circuit = filters.circuit;
  }

  if (filters.from || filters.to) {
    query.date = {};

    if (filters.from) {
      (query.date as Record<string, Date>).$gte =
        filters.from;
    }

    if (filters.to) {
      (query.date as Record<string, Date>).$lte =
        filters.to;
    }
  }

  return EventModel.find(query)
    .populate("circuit")
    .populate("layout")
    .populate("categories")
    .sort({ date: 1 })
    .lean();
};

export const getEventById = async (
  id: string,
) => {
  return EventModel.findById(id)
    .populate("circuit")
    .populate("layout")
    .populate("categories")
    .lean();
};

export const updateEvent = async (
  id: string,
  data: UpdateEventInput,
) => {
  // 1. Verify event
  const event = await EventModel.findById(id);

  if (!event) {
    throw new NotFoundError(
      "Event not found",
      "EVENT_NOT_FOUND",
    );
  }

  // Use existing values when they are not
  // included in the PATCH request.
  const circuitId =
    data.circuit ?? event.circuit.toString();

  const layoutId =
    data.layout ?? event.layout.toString();

  const categoryIds =
    data.categories ??
    event.categories.map((category) =>
      category.toString(),
    );

  // 2. Verify circuit
  const circuit =
    await CircuitModel.findById(circuitId);

  if (!circuit) {
    throw new NotFoundError(
      "Circuit not found",
      "CIRCUIT_NOT_FOUND",
    );
  }

  // 3. Verify layout
  const layout =
    await CircuitLayoutModel.findById(
      layoutId,
    );

  if (!layout) {
    throw new NotFoundError(
      "Circuit layout not found",
      "CIRCUIT_LAYOUT_NOT_FOUND",
    );
  }

  // 4. Verify layout belongs to circuit
  if (
    layout.circuit.toString() !==
    circuit._id.toString()
  ) {
    throw new ConflictError(
      "Circuit layout does not belong to the selected circuit",
      "LAYOUT_CIRCUIT_MISMATCH",
    );
  }

  // 5. Verify categories
  const categories =
    await CategoryModel.find({
      _id: {
        $in: categoryIds,
      },
    });

  if (
    categories.length !==
    categoryIds.length
  ) {
    throw new NotFoundError(
      "One or more categories were not found",
      "CATEGORY_NOT_FOUND",
    );
  }

  // 6. Verify categories belong to circuit
  const invalidCategory =
    categories.find(
      (category) =>
        category.circuit.toString() !==
        circuit._id.toString(),
    );

  if (invalidCategory) {
    throw new ConflictError(
      "One or more categories do not belong to the selected circuit",
      "CATEGORY_CIRCUIT_MISMATCH",
    );
  }

  // 7. Update event
  return EventModel.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    },
  )
    .populate("circuit")
    .populate("layout")
    .populate("categories")
    .lean();
};

export const deleteEvent = async (
  id: string,
) => {
  const event =
    await EventModel.findByIdAndDelete(id);

  if (!event) {
    throw new NotFoundError(
      "Event not found",
      "EVENT_NOT_FOUND",
    );
  }

  return event;
};