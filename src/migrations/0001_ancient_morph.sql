ALTER TABLE "users" ADD COLUMN "password" varchar NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "usernameindex_idx" ON "users" ("userName");