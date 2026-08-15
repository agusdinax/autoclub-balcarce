import swaggerJSDoc from "swagger-jsdoc";

import {
  authSchemas,
} from "./schemas/auth.swagger";

import {
  categorySchemas,
} from "./schemas/category.swagger";

import {
  circuitLayoutSchemas,
} from "./schemas/circuit-layout.swagger";

import {
  circuitSchemas,
} from "./schemas/circuit.swagger";

import {
  contactSchemas,
} from "./schemas/contact.swagger";

import {
  eventSchemas,
} from "./schemas/event.swagger";

import {
  gallerySchemas,
} from "./schemas/gallery.swagger";

import {
  kartRentalSchemas,
} from "./schemas/kart-rental.swagger";

import {
  newsSchemas,
} from "./schemas/news.swagger";

export const swaggerSpec =
  swaggerJSDoc({
    definition: {
      openapi: "3.0.3",

      info: {
        title:
          "Auto Club Balcarce API",

        version: "1.0.0",

        description:
          "REST API for managing Auto Club Balcarce circuits, circuit layouts, categories, events and related content.",

        contact: {
          name:
            "Auto Club Balcarce",
        },
      },

      servers: [
        {
          url:
            "http://localhost:3000/api/v1",

          description:
            "Local development",
        },
      ],

      tags: [
        {
          name: "Circuits",
          description:
            "Main circuits managed by Auto Club Balcarce",
        },

        {
          name:
            "Circuit Layouts",

          description:
            "Different configurations of each circuit",
        },

        {
          name: "Categories",

          description:
            "Competition categories associated with circuits",
        },

        {
          name: "Events",

          description:
            "Races, test days and special events managed by Auto Club Balcarce",
        },

        {
          name: "Kart Rentals",

          description:
            "Kart rental configuration and pricing",
        },

        {
          name: "News",

          description:
            "News and announcements published by Auto Club Balcarce",
        },

        {
          name: "Gallery",

          description:
            "Photo galleries related to Auto Club Balcarce circuits and events",
        },

        {
          name: "Contact",

          description:
            "Public contact form",
        },

        {
          name: "Auth",

          description:
            "Authentication and access management",
        },
      ],

      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",

            description:
              "Enter the JWT access token obtained from POST /auth/login",
          },
        },

        schemas: {
          ...authSchemas,
          ...categorySchemas,
          ...circuitSchemas,
          ...circuitLayoutSchemas,
          ...contactSchemas,
          ...eventSchemas,
          ...gallerySchemas,
          ...kartRentalSchemas,
          ...newsSchemas,
        },
      },
    },

    apis: [
      "./src/**/*.ts",
    ],
  });