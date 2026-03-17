import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160, { message: "Description should be less than 160 characters." }),
    pubDate: z.date().optional(),
    updatedDate: z.date().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()),
  }),
});

const experimentCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/experiments" }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160, { message: "Description should be less than 160 characters." }),
    pubDate: z.date().optional(),
    updatedDate: z.date().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()),
  }),
});

export const collections = {
  'blog': blogCollection,
  'experiments': experimentCollection,
};
