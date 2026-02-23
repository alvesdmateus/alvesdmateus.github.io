import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    techStack: z.array(z.string()),
    liveUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    sortOrder: z.number().default(0),
    portfolioPath: z.enum(['sre', 'mobile']).optional(),
    provider: z.array(z.string()).optional(),
    challenge: z.string().optional(),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    role: z.string(),
    company: z.string(),
    companyUrl: z.string().url().optional(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    location: z.string().optional(),
    type: z
      .enum(['full-time', 'part-time', 'contract', 'freelance', 'internship', 'remote'])
      .optional(),
    portfolioPath: z.enum(['sre', 'mobile']).optional(),
  }),
});

const skills = defineCollection({
  loader: file('src/data/skills.json'),
  schema: z.object({
    category: z.string(),
    items: z.array(z.string()),
  }),
});

const social = defineCollection({
  loader: file('src/data/social.json'),
  schema: z.object({
    platform: z.string(),
    url: z.string().url(),
    icon: z.string(),
  }),
});

export const collections = { projects, experience, skills, social };
