import { EventModel } from "../../src/modules/events/event.model";
import { EventType, EventStatus } from "../../src/modules/events/event.types";

import { createTestCircuit } from "./circuit.fixture";
import { createTestCircuitLayout } from "./circuit-layout.fixture";
import { createTestCategory } from "./category.fixture";

interface CreateTestEventOptions {
  circuitId?: string;
  layoutId?: string;
  categoryIds?: string[];

  title?: string;
  type?: EventType;
  status?: EventStatus;
  date?: Date;
}

export const createTestEvent = async (
  options: CreateTestEventOptions = {},
) => {
  const circuit =
    options.circuitId
      ? null
      : await createTestCircuit();

  const circuitId =
    options.circuitId ??
    circuit!._id.toString();

  const layout =
    options.layoutId
      ? null
      : await createTestCircuitLayout({
          circuitId,
        });

  const layoutId =
    options.layoutId ??
    layout!._id.toString();

  let categoryIds =
    options.categoryIds;

  if (!categoryIds) {
    const category =
      await createTestCategory({
        circuitId,
      });

    categoryIds = [
      category._id.toString(),
    ];
  }

  return EventModel.create({
    title:
      options.title ??
      `Test Event ${Date.now()}`,

    type:
      options.type ??
      EventType.RACE,

    status:
      options.status ??
      EventStatus.PUBLISHED,

    date:
      options.date ??
      new Date(
        Date.now() +
          24 * 60 * 60 * 1000,
      ),

    circuit: circuitId,

    layout: layoutId,

    categories: categoryIds,
  });
};