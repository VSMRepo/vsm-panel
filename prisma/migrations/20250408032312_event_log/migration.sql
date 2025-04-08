-- CreateTable
CREATE TABLE "EventLog" (
    "id" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,
    "app_version" TEXT,
    "os_version" TEXT,
    "machine_id" TEXT,
    "internal_ip" TEXT,
    "external_ip" TEXT,
    "time_exported" TEXT,
    "store_id" TEXT NOT NULL,
    "duration" INTEGER,
    "compras_count" INTEGER NOT NULL DEFAULT 0,
    "sat_count" INTEGER NOT NULL DEFAULT 0,
    "nfce_count" INTEGER NOT NULL DEFAULT 0,
    "nfe_count" INTEGER NOT NULL DEFAULT 0,
    "compacted" BOOLEAN NOT NULL DEFAULT true,
    "reports" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventLog_pkey" PRIMARY KEY ("id")
);
