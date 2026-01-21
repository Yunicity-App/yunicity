import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  real,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

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
export const partnersRelations = relations(partners, ({ many }) => ({
  deals: many(deals),
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
export type Partner = typeof partners.$inferSelect;
export type NewPartner = typeof partners.$inferInsert;
export type Deal = typeof deals.$inferSelect;
export type NewDeal = typeof deals.$inferInsert;
