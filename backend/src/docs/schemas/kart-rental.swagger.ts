export const kartRentalSchemas = {
  CreateKartRental: {
    type: "object",

    required: [
      "circuit",
      "title",
      "description",
      "options",
    ],

    properties: {
      circuit: {
        type: "string",
        description:
          "MongoDB ObjectId of the associated kartodrome",
        example:
          "68a123456789abcdef123456",
      },

      title: {
        type: "string",
        example:
          "Alquiler de Karting",
      },

      description: {
        type: "string",
        example:
          "Disfrutá una experiencia de karting en el Kartódromo de Balcarce.",
      },

      requirements: {
        type: "array",
        items: {
          type: "string",
        },
        example: [
          "Presentar DNI",
          "Uso obligatorio de casco",
        ],
      },

      options: {
        type: "array",
        minItems: 1,

        items: {
          type: "object",

          required: [
            "name",
            "duration",
            "price",
            "currency",
          ],

          properties: {
            name: {
              type: "string",
              example: "10 minutos",
            },

            duration: {
              type: "integer",
              minimum: 1,
              example: 10,
            },

            price: {
              type: "number",
              minimum: 0,
              example: 15000,
            },

            currency: {
              type: "string",
              enum: ["ARS", "USD"],
              example: "ARS",
            },

            description: {
              type: "string",
              nullable: true,
            },
          },
        },
      },

      isActive: {
        type: "boolean",
        example: true,
        default: true,
      },
    },
  },

  UpdateKartRental: {
    type: "object",

    properties: {
      circuit: {
        type: "string",
      },

      title: {
        type: "string",
      },

      description: {
        type: "string",
      },

      requirements: {
        type: "array",
        items: {
          type: "string",
        },
      },

      options: {
        type: "array",
        minItems: 1,
        items: {
          type: "object",
        },
      },

      isActive: {
        type: "boolean",
      },
    },
  },

  KartRental: {
    type: "object",

    properties: {
      _id: {
        type: "string",
      },

      circuit: {
        $ref:
          "#/components/schemas/Circuit",
      },

      title: {
        type: "string",
      },

      description: {
        type: "string",
      },

      requirements: {
        type: "array",
        items: {
          type: "string",
        },
      },

      options: {
        type: "array",
        items: {
          type: "object",
        },
      },

      isActive: {
        type: "boolean",
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