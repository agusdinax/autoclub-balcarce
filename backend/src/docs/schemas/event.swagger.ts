export const eventSchemas = {
  CreateEvent: {
    type: "object",

    required: [
      "title",
      "slug",
      "type",
      "date",
      "description",
      "circuit",
      "layout",
    ],

    properties: {
      title: {
        type: "string",
        example:
          "Gran Premio Balcarce",
      },

      slug: {
        type: "string",
        example:
          "gran-premio-balcarce",
      },

      type: {
        type: "string",
        enum: [
          "RACE",
          "TEST_DAY",
          "SPECIAL_EVENT",
        ],
        example: "RACE",
      },

      status: {
        type: "string",
        enum: [
          "DRAFT",
          "PUBLISHED",
          "CANCELLED",
          "FINISHED",
        ],
        example: "PUBLISHED",
        default: "DRAFT",
      },

      date: {
        type: "string",
        format: "date-time",
      },

      description: {
        type: "string",
      },

      circuit: {
        type: "string",
      },

      layout: {
        type: "string",
      },

      categories: {
        type: "array",
        items: {
          type: "string",
        },
      },

      imageUrl: {
        type: "string",
        nullable: true,
      },

      registrationUrl: {
        type: "string",
        nullable: true,
      },
    },
  },

  UpdateEvent: {
    type: "object",

    properties: {
      title: {
        type: "string",
      },

      slug: {
        type: "string",
      },

      type: {
        type: "string",
        enum: [
          "RACE",
          "TEST_DAY",
          "SPECIAL_EVENT",
        ],
      },

      status: {
        type: "string",
        enum: [
          "DRAFT",
          "PUBLISHED",
          "CANCELLED",
          "FINISHED",
        ],
      },

      date: {
        type: "string",
        format: "date-time",
      },

      description: {
        type: "string",
      },

      circuit: {
        type: "string",
      },

      layout: {
        type: "string",
      },

      categories: {
        type: "array",
        items: {
          type: "string",
        },
      },

      imageUrl: {
        type: "string",
        nullable: true,
      },

      registrationUrl: {
        type: "string",
        nullable: true,
      },
    },
  },

  Event: {
    type: "object",

    properties: {
      _id: {
        type: "string",
      },

      title: {
        type: "string",
      },

      slug: {
        type: "string",
      },

      type: {
        type: "string",
        enum: [
          "RACE",
          "TEST_DAY",
          "SPECIAL_EVENT",
        ],
      },

      status: {
        type: "string",
        enum: [
          "DRAFT",
          "PUBLISHED",
          "CANCELLED",
          "FINISHED",
        ],
      },

      date: {
        type: "string",
        format: "date-time",
      },

      description: {
        type: "string",
      },

      circuit: {
        $ref:
          "#/components/schemas/Circuit",
      },

      layout: {
        $ref:
          "#/components/schemas/CircuitLayout",
      },

      categories: {
        type: "array",
        items: {
          $ref:
            "#/components/schemas/Category",
        },
      },

      imageUrl: {
        type: "string",
        nullable: true,
      },

      registrationUrl: {
        type: "string",
        nullable: true,
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