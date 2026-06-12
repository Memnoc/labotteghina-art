import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      year: z.number(),
      medium: z.string(),
      dimensions: z.string(),
      cover: image(),
      order: z.number(),
      hero: z.boolean().default(false),
    }),
});

export const collections = { works };
