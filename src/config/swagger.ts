import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog API",
      version: "1.0.0",
      description: "Authentication and Blog Post APIs",
    },

    servers: [
      {
        url: "http://localhost:5000",
        description: "Local development server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        PostCreate: {
          type: "object",
          required: ["title", "excerpt", "contentHtml"],
          properties: {
            title: {
              type: "string",
              example: "Why Node.js is Great",
            },
            excerpt: {
              type: "string",
              example: "Node.js is fast, scalable, and widely used...",
            },
            contentHtml: {
              type: "string",
              example: "<p>Node.js is awesome</p>",
            },
            contentBlocks: {
              type: "array",
              items: {
                type: "object",
              },
            },
            status: {
              type: "string",
              enum: ["draft", "published"],
            },
            seoKeywords: {
              type: "array",
              items: { type: "string" },
              example: ["nodejs", "backend"],
            },
            categoryId: {
              type: "string",
              nullable: true,
            },
          },
        },

        PostUpdate: {
          type: "object",
          properties: {
            title: { type: "string" },
            excerpt: { type: "string" },
            contentHtml: { type: "string" },
            contentBlocks: {
              type: "array",
              items: { type: "object" },
            },
            status: {
              type: "string",
              enum: ["draft", "published", "archived"],
            },
            seoKeywords: {
              type: "array",
              items: { type: "string" },
            },
            categoryId: {
              type: "string",
              nullable: true,
            },
          },
        },
      },
    },
  },

  apis: ["src/modules/**/*.ts"], // auth + posts routes
});
