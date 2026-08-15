export const newsSchemas = {
  CreateNews: {
    type: "object",

    required: [
      "title",
      "slug",
      "excerpt",
      "content",
    ],

    properties: {
      title: {
        type: "string",
        example:
          "El Auto Club Balcarce vuelve a tener actividad",
      },

      slug: {
        type: "string",
        example:
          "el-auto-club-balcarce-vuelve-a-tener-actividad",
      },

      excerpt: {
        type: "string",
        example:
          "El circuito vuelve a recibir actividad deportiva.",
      },

      content: {
        type: "string",
        example:
          "El Auto Club Balcarce prepara una nueva etapa de actividad en sus circuitos.",
      },

      imageUrl: {
        type: "string",
        nullable: true,
      },

      publishedAt: {
        type: "string",
        format: "date-time",
        nullable: true,
      },

      status: {
        type: "string",
        enum: [
          "DRAFT",
          "PUBLISHED",
          "ARCHIVED",
        ],
        example: "DRAFT",
        default: "DRAFT",
      },

      circuit: {
        type: "string",
        nullable: true,
      },

      event: {
        type: "string",
        nullable: true,
      },
    },
  },

  UpdateNews: {
    type: "object",

    properties: {
      title: {
        type: "string",
      },

      slug: {
        type: "string",
      },

      excerpt: {
        type: "string",
      },

      content: {
        type: "string",
      },

      imageUrl: {
        type: "string",
        nullable: true,
      },

      publishedAt: {
        type: "string",
        format: "date-time",
        nullable: true,
      },

      status: {
        type: "string",
        enum: [
          "DRAFT",
          "PUBLISHED",
          "ARCHIVED",
        ],
      },

      circuit: {
        type: "string",
        nullable: true,
      },

      event: {
        type: "string",
        nullable: true,
      },
    },
  },

  News: {
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

      excerpt: {
        type: "string",
      },

      content: {
        type: "string",
      },

      imageUrl: {
        type: "string",
        nullable: true,
      },

      publishedAt: {
        type: "string",
        format: "date-time",
        nullable: true,
      },

      status: {
        type: "string",
        enum: [
          "DRAFT",
          "PUBLISHED",
          "ARCHIVED",
        ],
      },

      circuit: {
        nullable: true,
        allOf: [
          {
            $ref:
              "#/components/schemas/Circuit",
          },
        ],
      },

      event: {
        nullable: true,
        allOf: [
          {
            $ref:
              "#/components/schemas/Event",
          },
        ],
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