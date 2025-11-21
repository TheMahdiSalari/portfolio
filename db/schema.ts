import { pgTable, text, timestamp, boolean, uuid } from 'drizzle-orm/pg-core';

// جدول کاربران
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(), // استفاده از UUID واقعی پستگرس
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// جدول پست‌ها
export const posts = pgTable('posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  content: text('content').notNull(),
  imageUrl: text('image_url'),
  tags: text('tags'),
  published: boolean('published').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});