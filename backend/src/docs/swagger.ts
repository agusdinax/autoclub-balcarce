import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.3",

    info: {
      title: "Auto Club Balcarce API",
      version: "1.0.0",
      description:
        "REST API for Auto Club Balcarce website.",
    },

    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Local development",
      },
    ],

    tags: [
      {
        name: "Circuits",
        description:
          "Main circuits managed by Auto Club Balcarce",
      },
      {
        name: "Circuit Layouts",
        description:
          "Different configurations of each circuit",
      },
      {
        name: "Categories",
        description:
          "Competition categories associated with circuits",
      },
    ],

    components: {
      schemas: {
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
          allOf: [
            {
              $ref: "#/components/schemas/CreateCircuit",
            },
          ],
        },
      },
    },
  },

  apis: ["./src/**/*.ts"],
});