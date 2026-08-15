export const contactSchemas = {
  CreateContact: {
    type: "object",

    required: [
      "name",
      "email",
      "subject",
      "message",
    ],

    properties: {
      name: {
        type: "string",
        example: "Juan Pérez",
      },

      email: {
        type: "string",
        format: "email",
        example:
          "juan@email.com",
      },

      phone: {
        type: "string",
        nullable: true,
        example:
          "2266-123456",
      },

      subject: {
        type: "string",
        example:
          "Consulta sobre karting",
      },

      message: {
        type: "string",
        example:
          "Quería consultar por el alquiler de karting.",
      },
    },
  },

  Contact: {
    type: "object",

    properties: {
      _id: {
        type: "string",
        example:
          "68f123456789abcdef123456",
      },

      name: {
        type: "string",
        example: "Juan Pérez",
      },

      email: {
        type: "string",
        format: "email",
        example:
          "juan@email.com",
      },

      phone: {
        type: "string",
        nullable: true,
        example:
          "2266-123456",
      },

      subject: {
        type: "string",
        example:
          "Consulta sobre karting",
      },

      message: {
        type: "string",
        example:
          "Quería consultar por el alquiler de karting.",
      },

      status: {
        type: "string",
        enum: [
          "UNREAD",
          "READ",
          "ARCHIVED",
        ],
        example: "UNREAD",
      },

      createdAt: {
        type: "string",
        format: "date-time",
      },

      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
  },
};