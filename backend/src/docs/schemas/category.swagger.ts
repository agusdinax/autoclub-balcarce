export const categorySchemas = {
  CreateCategory: {
    type: "object",

    required: [
      "name",
      "slug",
      "circuit",
    ],

    properties: {
      name: {
        type: "string",
        example: "Karting Senior",
      },

      slug: {
        type: "string",
        example:
          "karting-senior",
      },

      circuit: {
        type: "string",
        description:
          "MongoDB ObjectId of the associated circuit",
        example:
          "68a123456789abcdef123456",
      },

      description: {
        type: "string",
        nullable: true,
        example:
          "Categoría de karting.",
      },

      isActive: {
        type: "boolean",
        example: true,
      },
    },
  },

  Category: {
    type: "object",

    properties: {
      _id: {
        type: "string",
        example:
          "68c123456789abcdef123456",
      },

      name: {
        type: "string",
        example: "Karting Senior",
      },

      slug: {
        type: "string",
        example:
          "karting-senior",
      },

      circuit: {
        $ref: "#/components/schemas/Circuit",
      },

      description: {
        type: "string",
        nullable: true,
        example:
          "Categoría de karting.",
      },

      isActive: {
        type: "boolean",
        example: true,
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