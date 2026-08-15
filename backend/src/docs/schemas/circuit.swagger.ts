export const circuitSchemas = {
  CreateCircuit: {
    type: "object",

    required: [
      "name",
      "slug",
      "type",
      "description",
      "location",
    ],

    properties: {
      name: {
        type: "string",
        example:
          "Autódromo Juan Manuel Fangio",
      },

      slug: {
        type: "string",
        example:
          "autodromo-juan-manuel-fangio",
      },

      type: {
        type: "string",
        enum: [
          "AUTODROMO",
          "KARTODROMO",
        ],
        example: "AUTODROMO",
      },

      description: {
        type: "string",
        example:
          "Circuito automovilístico de Balcarce.",
      },

      location: {
        type: "string",
        example:
          "Balcarce, Buenos Aires, Argentina",
      },

      mapUrl: {
        type: "string",
        nullable: true,
        example: null,
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

  Circuit: {
    type: "object",

    properties: {
      _id: {
        type: "string",
        example:
          "68a123456789abcdef123456",
      },

      name: {
        type: "string",
        example:
          "Autódromo Juan Manuel Fangio",
      },

      slug: {
        type: "string",
        example:
          "autodromo-juan-manuel-fangio",
      },

      type: {
        type: "string",
        enum: [
          "AUTODROMO",
          "KARTODROMO",
        ],
        example: "AUTODROMO",
      },

      description: {
        type: "string",
        example:
          "Circuito automovilístico de Balcarce.",
      },

      location: {
        type: "string",
        example:
          "Balcarce, Buenos Aires, Argentina",
      },

      mapUrl: {
        type: "string",
        nullable: true,
        example: null,
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