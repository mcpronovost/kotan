-- CreateTable
CREATE TABLE "auth_users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "auth_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game_settlements" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "game_settlements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game_settlers" (
    "id" TEXT NOT NULL,
    "settlementId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "health_pain" INTEGER NOT NULL DEFAULT 0,
    "health_infection" INTEGER NOT NULL DEFAULT 0,
    "health_digestion" INTEGER NOT NULL DEFAULT 100,
    "health_consciousness" INTEGER NOT NULL DEFAULT 100,
    "health_sanity" INTEGER NOT NULL DEFAULT 100,
    "capacity_breathing" INTEGER NOT NULL DEFAULT 100,
    "capacity_eating" INTEGER NOT NULL DEFAULT 100,
    "capacity_hearing" INTEGER NOT NULL DEFAULT 100,
    "capacity_moving" INTEGER NOT NULL DEFAULT 100,
    "capacity_seeing" INTEGER NOT NULL DEFAULT 100,
    "needs_thirst" INTEGER NOT NULL DEFAULT 100,
    "needs_hunger" INTEGER NOT NULL DEFAULT 100,
    "needs_sleep" INTEGER NOT NULL DEFAULT 100,
    "needs_rest" INTEGER NOT NULL DEFAULT 100,
    "needs_social" INTEGER NOT NULL DEFAULT 100,
    "attr_strength" INTEGER NOT NULL DEFAULT 0,
    "attr_constitution" INTEGER NOT NULL DEFAULT 0,
    "attr_dexterity" INTEGER NOT NULL DEFAULT 0,
    "attr_perception" INTEGER NOT NULL DEFAULT 0,
    "attr_intelligence" INTEGER NOT NULL DEFAULT 0,
    "attr_wisdom" INTEGER NOT NULL DEFAULT 0,
    "skill_digging" INTEGER NOT NULL DEFAULT 0,
    "skill_logging" INTEGER NOT NULL DEFAULT 0,
    "skill_mining" INTEGER NOT NULL DEFAULT 0,
    "skill_foraging" INTEGER NOT NULL DEFAULT 0,
    "skill_fishing" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "game_settlers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "auth_users_username_key" ON "auth_users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "auth_users_email_key" ON "auth_users"("email");

-- AddForeignKey
ALTER TABLE "game_settlements" ADD CONSTRAINT "game_settlements_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "auth_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_settlers" ADD CONSTRAINT "game_settlers_settlementId_fkey" FOREIGN KEY ("settlementId") REFERENCES "game_settlements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
