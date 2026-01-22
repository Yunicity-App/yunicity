/**
 * Migration Script: Import landing page subscribers to Yunicity users
 *
 * Usage:
 *   npx tsx src/db/migrate-landing.ts
 *
 * Input format (CSV or JSON):
 *   - email: string (required)
 *   - firstName?: string
 *   - lastName?: string
 *   - signupDate?: string (ISO date)
 */

import "dotenv/config";
import { db } from "../lib/db";
import { users, pointsTransactions } from "./schema";
import { eq } from "drizzle-orm";

// ===========================================
// CONFIGURATION
// ===========================================
const MIGRATION_BONUS_POINTS = 150; // Bonus for early adopters
const SIGNUP_BONUS_POINTS = 100;

// ===========================================
// SAMPLE DATA - Replace with actual landing page data
// ===========================================
const LANDING_PAGE_SUBSCRIBERS = [
  {
    email: "early.adopter@example.com",
    firstName: "Marie",
    lastName: "Martin",
    signupDate: "2024-01-10",
  },
  {
    email: "reims.lover@example.com",
    firstName: "Pierre",
    lastName: "Dubois",
    signupDate: "2024-01-15",
  },
  {
    email: "local.supporter@example.com",
    firstName: "Sophie",
    lastName: "Bernard",
    signupDate: "2024-01-20",
  },
  // Add more subscribers from your landing page here
];

// ===========================================
// MIGRATION FUNCTIONS
// ===========================================

interface LandingSubscriber {
  email: string;
  firstName?: string;
  lastName?: string;
  signupDate?: string;
}

async function migrateSubscriber(subscriber: LandingSubscriber) {
  const { email, firstName, lastName, signupDate } = subscriber;

  // Check if user already exists
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    console.log(`   ⏭️  ${email} - Already exists, skipping`);
    return { status: "skipped", email };
  }

  // Create user with migration bonus
  const totalPoints = SIGNUP_BONUS_POINTS + MIGRATION_BONUS_POINTS;

  const [newUser] = await db
    .insert(users)
    .values({
      clerkId: `migrated_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email,
      firstName: firstName || null,
      lastName: lastName || null,
      role: "user",
      points: totalPoints,
      createdAt: signupDate ? new Date(signupDate) : new Date(),
      updatedAt: new Date(),
    })
    .returning();

  // Record the points transactions
  await db.insert(pointsTransactions).values([
    {
      userId: newUser.id,
      amount: SIGNUP_BONUS_POINTS,
      reason: "signup_bonus",
      createdAt: new Date(),
    },
    {
      userId: newUser.id,
      amount: MIGRATION_BONUS_POINTS,
      reason: "early_adopter_bonus",
      createdAt: new Date(),
    },
  ]);

  console.log(`   ✓ ${email} - Migrated with ${totalPoints} points`);
  return { status: "migrated", email, userId: newUser.id };
}

async function migrate() {
  console.log("🚀 Starting landing page migration...\n");
  console.log(`📊 Total subscribers to migrate: ${LANDING_PAGE_SUBSCRIBERS.length}`);
  console.log(`🎁 Signup bonus: ${SIGNUP_BONUS_POINTS} points`);
  console.log(`⭐ Early adopter bonus: ${MIGRATION_BONUS_POINTS} points`);
  console.log("");

  const results = {
    migrated: 0,
    skipped: 0,
    failed: 0,
  };

  for (const subscriber of LANDING_PAGE_SUBSCRIBERS) {
    try {
      const result = await migrateSubscriber(subscriber);
      if (result.status === "migrated") {
        results.migrated++;
      } else {
        results.skipped++;
      }
    } catch (error) {
      console.error(`   ❌ ${subscriber.email} - Failed:`, error);
      results.failed++;
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log("📈 Migration Summary:");
  console.log(`   ✓ Migrated: ${results.migrated}`);
  console.log(`   ⏭️  Skipped: ${results.skipped}`);
  console.log(`   ❌ Failed: ${results.failed}`);
  console.log("=".repeat(50));

  if (results.failed > 0) {
    process.exit(1);
  }
}

// ===========================================
// UTILITY: Import from CSV file
// ===========================================
export async function importFromCSV(csvPath: string) {
  const fs = await import("fs");
  const content = fs.readFileSync(csvPath, "utf-8");
  const lines = content.split("\n").filter((line) => line.trim());

  // Skip header
  const dataLines = lines.slice(1);

  const subscribers: LandingSubscriber[] = dataLines.map((line) => {
    const [email, firstName, lastName, signupDate] = line.split(",").map((s) => s.trim());
    return { email, firstName, lastName, signupDate };
  });

  console.log(`📁 Loaded ${subscribers.length} subscribers from CSV`);
  return subscribers;
}

// Run migration
migrate().catch(console.error);
