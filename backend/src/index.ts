import { createServer } from "node:http";
import { prisma } from "./db";
import app from "./app";

const PORT = Number(process.env.PORT ?? 3000);

const server = createServer(app);

// Express applies a bounded inactivity timeout after workload admission.
// Keep Node's whole-request deadline disabled so route-specific long uploads
// and streams can set their own inactivity limit without a conflicting cap.
server.requestTimeout = 0;
server.timeout = 120000;
server.keepAliveTimeout = 65000; // 65 seconds (should be > 60s for proper connection reuse)
server.headersTimeout = 66000; // 66 seconds (should be slightly > keepAliveTimeout)

server.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

const shutdown = async () => {
  await prisma.$disconnect();
  process.exit(0);
};

process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);

export default server;
