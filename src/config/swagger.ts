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
          required: ["title", "excerpt", "contentHtml", "status"],
          properties: {
            title: {
              type: "string",
              minLength: 3,
              example: "Why Node.js is Great",
            },

            excerpt: {
              type: "string",
              minLength: 10,
              example: "Node.js is fast, scalable, and widely used...",
            },

            contentHtml: {
              type: "string",
              example: "<p>Node.js is awesome</p>",
            },

            contentBlocks: {
              type: "array",
              description: "Rich editor content blocks",
              items: {
                type: "object",
                additionalProperties: true,
              },
              example: [
                {
                  type: "paragraph",
                  data: {
                    text: "Node.js is awesome",
                  },
                },
              ],
            },

            status: {
              type: "string",
              enum: ["draft", "published"],
              example: "draft",
            },

            seoKeywords: {
              type: "array",
              items: {
                type: "string",
              },
              example: ["nodejs", "backend"],
            },

            categoryId: {
              type: "string",
              nullable: true,
              description: "Category ObjectId",
              example: "697c4e671ee841e49d86b622",
            },

            tagIds: {
              type: "array",
              description: "Array of Tag ObjectIds",
              items: {
                type: "string",
              },
              example: ["697c4e681ee841e49d86b64f", "697c4e681ee841e49d86b652"],
            },

            /* ---------- IMAGES ---------- */
            coverImageUrl: {
              type: "string",
              nullable: true,
              description: "Cover image URL for the blog post",
              example:
                "http://localhost:5000/uploads/blogs/covers/1770129001234-cover.png",
            },

            galleryImageUrls: {
              type: "array",
              description: "Gallery image URLs (3–5 images recommended)",
              items: {
                type: "string",
                example:
                  "http://localhost:5000/uploads/blogs/gallery/1770129001235-1.png",
              },
              example: [
                "http://localhost:5000/uploads/blogs/gallery/1770129001235-1.png",
                "http://localhost:5000/uploads/blogs/gallery/1770129001236-2.png",
                "http://localhost:5000/uploads/blogs/gallery/1770129001237-3.png",
              ],
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
