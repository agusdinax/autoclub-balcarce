export const circuitLayoutSchemas = {
  CreateCircuitLayout: {
    type: "object",

    required: [
      "name",
      "slug",
      "circuit",
      "description",
    ],

    properties: {
      name: {
        type: "string",
        example: "Trazado principal",
      },

      slug: {
        type: "string",
        example:
          "trazado-principal",
      },

      circuit: {
        type: "string",
        description:
          "MongoDB ObjectId of the parent circuit",
        example:
          "68a123456789abcdef123456",
      },

      description: {
        type: "string",
        example:
          "Trazado principal del circuito.",
      },

      length: {
        type: "number",
        format: "float",
        minimum: 0,
        example: 4.592,
        description:
          "Circuit length in kilometers",
      },

      imageUrl: {
        type: "string",
        nullable: true,
        example: null,
      },

      isActive: {
        type: "boolean",
        example: true,
      },
    },
  },

  CircuitLayout: {
    type: "object",

    properties: {
      _id: {
        type: "string",
        example:
          "68b123456789abcdef123456",
      },

      name: {
        type: "string",
        example: "Trazado principal",
      },

      slug: {
        type: "string",
        example:
          "trazado-principal",
      },

      circuit: {
        $ref: "#/components/schemas/Circuit",
      },

      description: {
        type: "string",
        example:
          "Trazado principal del circuito.",
      },

      length: {
        type: "number",
        format: "float",
        example: 4.592,
      },

      imageUrl: {
        type: "string",
        nullable: true,
        example: null,
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