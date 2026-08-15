export const authSchemas = {
  LoginRequest: {
    type: "object",

    required: [
      "email",
      "password",
    ],

    properties: {
      email: {
        type: "string",
        format: "email",
        example:
          "admin@autoclubbalcarce.com",
      },

      password: {
        type: "string",
        format: "password",
        example:
          "Admin123456!",
      },
    },
  },

  AuthUser: {
    type: "object",

    properties: {
      id: {
        type: "string",
        example:
          "68f123456789abcdef123456",
      },

      email: {
        type: "string",
        format: "email",
        example:
          "admin@autoclubbalcarce.com",
      },

      role: {
        type: "string",
        enum: ["ADMIN"],
        example: "ADMIN",
      },
    },
  },

  LoginResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
        example: true,
      },

      data: {
        type: "object",

        properties: {
          accessToken: {
            type: "string",
            description:
              "JWT access token used to authenticate protected API requests",
            example:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          },

          user: {
            $ref:
              "#/components/schemas/AuthUser",
          },
        },
      },
    },
  },
};