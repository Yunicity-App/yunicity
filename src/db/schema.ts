import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  real,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ============================================
// USERS (synced with Clerk)
// ============================================
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  clerkId: text("clerk_id").notNull().unique(),
  email: text("email").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  imageUrl: text("image_url"),
  role: text("role").default("user").notNull(), // user | partner | admin
  points: integer("points").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================
// POSTS (La Voix de la Ville - Annonces)
// ============================================
export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  authorId: uuid("author_id").references(() => users.id).notNull(),
  partnerId: uuid("partner_id").references(() => partners.id), // null if user post
  title: text("title").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  eventDate: timestamp("event_date"),
  isPublished: boolean("is_published").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================
// POINTS TRANSACTIONS (historique des points)
// ============================================
export const pointsTransactions = pgTable("points_transactions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  amount: integer("amount").notNull(), // positive = gain, negative = spend
  reason: text("reason").notNull(), // "signup_bonus", "deal_redeemed", "referral", etc.
  referenceId: uuid("reference_id"), // optional: deal_id, partner_id, etc.
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================
// PARTNERS
// ============================================
export const partners = pgTable("partners", {
  id: uuid("id").defaultRandom().primaryKey(),
  nom: text("nom").notNull(),
  description: text("description"),
  logoUrl: text("logo_url"),
  category: text("category").notNull(),
  address: text("adresse").notNull(),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================
// DEALS
// ============================================
export const deals = pgTable("deals", {
  id: uuid("id").defaultRandom().primaryKey(),
  partnerId: uuid("partner_id")
    .references(() => partners.id)
    .notNull(),
  titre: text("titre").notNull(),
  description: text("description"),
  pointsRequis: integer("points_requis").default(0).notNull(),
  dateFin: timestamp("date_fin"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================
// RELATIONS
// ============================================
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  pointsTransactions: many(pointsTransactions),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  partner: one(partners, {
    fields: [posts.partnerId],
    references: [partners.id],
  }),
}));

export const pointsTransactionsRelations = relations(pointsTransactions, ({ one }) => ({
  user: one(users, {
    fields: [pointsTransactions.userId],
    references: [users.id],
  }),
}));

export const partnersRelations = relations(partners, ({ many }) => ({
  deals: many(deals),
  posts: many(posts),
}));

export const dealsRelations = relations(deals, ({ one }) => ({
  partner: one(partners, {
    fields: [deals.partnerId],
    references: [partners.id],
  }),
}));

// ============================================
// TYPES
// ============================================
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
export type PointsTransaction = typeof pointsTransactions.$inferSelect;
export type NewPointsTransaction = typeof pointsTransactions.$inferInsert;
export type Partner = typeof partners.$inferSelect;
export type NewPartner = typeof partners.$inferInsert;
export type Deal = typeof deals.$inferSelect;
export type NewDeal = typeof deals.$inferInsert;
