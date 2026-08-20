import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./db/client";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const admin_user = await prisma.user.upsert({
    where: { email: "mc@kotan.ca" },
    update: {},
    create: {
      username: "mc",
      email: "mc@kotan.ca",
      password: "1",
      name: "mcpronovost",
      settlements: {
        create: {
          name: "Ponkotan",
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
