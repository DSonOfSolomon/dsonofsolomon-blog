CREATE TABLE IF NOT EXISTS "Follower" (
  "id" TEXT NOT NULL,
  "endpoint" TEXT NOT NULL,
  "p256dh" TEXT NOT NULL,
  "auth" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'active',
  "userAgent" TEXT,
  "lastNotifiedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "creatorId" TEXT NOT NULL,

  CONSTRAINT "Follower_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "Follower_endpoint_key" ON "Follower"("endpoint");
CREATE INDEX IF NOT EXISTS "Follower_creatorId_createdAt_idx" ON "Follower"("creatorId", "createdAt");

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.table_constraints
    WHERE constraint_name = 'Follower_creatorId_fkey'
  ) THEN
    ALTER TABLE "Follower"
    ADD CONSTRAINT "Follower_creatorId_fkey"
    FOREIGN KEY ("creatorId") REFERENCES "Creator"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;
