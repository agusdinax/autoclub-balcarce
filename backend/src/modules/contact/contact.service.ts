import { ContactModel } from "./contact.model";
import {
  CreateContactInput,
} from "./contact.schema";
import {
  ContactStatus,
} from "./contact.types";

export const createContact =
  async (
    data: CreateContactInput,
  ) => {
    return ContactModel.create({
      ...data,

      status:
        ContactStatus.UNREAD,
    });
  };