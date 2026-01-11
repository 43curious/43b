// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

// 2. Define a `type` and `schema` for each collection
const blogCollection = defineCollection({
  type: 'content', // v2.5.0 and later
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
  type: 'content', // v2.5.0 and later
  schema: z.object({
    title: z.string(),
    description: z.string().max(160, { message: "Description should be less than 160 characters." }),
    pubDate: z.date().optional(),
    updatedDate: z.date().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  'blog': blogCollection,
  'experiments': experimentCollection,
};