export const gallerySchemas = {
  GalleryImage: {
    type: "object",

    required: [
      "url",
      "order",
    ],

    properties: {
      url: {
        type: "string",
        format: "uri",
        example:
          "https://example.com/images/race-01.jpg",
      },

      caption: {
        type: "string",
        nullable: true,
        example:
          "Salida de la carrera",
      },

      order: {
        type: "integer",
        minimum: 0,
        example: 0,
      },
    },
  },

  CreateGallery: {
    type: "object",

    required: [
      "title",
      "slug",
      "images",
    ],

    properties: {
      title: {
        type: "string",
        example:
          "Gran Premio Balcarce - Septiembre 2026",
      },

      slug: {
        type: "string",
        example:
          "gran-premio-balcarce-septiembre-2026",
      },

      description: {
        type: "string",
        nullable: true,
      },

      images: {
        type: "array",
        minItems: 1,
        items: {
          $ref:
            "#/components/schemas/GalleryImage",
        },
      },

      circuit: {
        type: "string",
        nullable: true,
        example:
          "68a123456789abcdef123456",
      },

      event: {
        type: "string",
        nullable: true,
        example:
          "68e123456789abcdef123456",
      },

      isActive: {
        type: "boolean",
        example: true,
        default: true,
      },
    },
  },

  UpdateGallery: {
    type: "object",

    properties: {
      title: {
        type: "string",
      },

      slug: {
        type: "string",
      },

      description: {
        type: "string",
        nullable: true,
      },

      images: {
        type: "array",
        minItems: 1,
        items: {
          $ref:
            "#/components/schemas/GalleryImage",
        },
      },

      circuit: {
        type: "string",
        nullable: true,
      },

      event: {
        type: "string",
        nullable: true,
      },

      isActive: {
        type: "boolean",
      },
    },
  },

  Gallery: {
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

      description: {
        type: "string",
        nullable: true,
      },

      images: {
        type: "array",
        items: {
          $ref:
            "#/components/schemas/GalleryImage",
        },
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