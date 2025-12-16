import { startServer } from "./core/server/server";
import { startBot } from "./core/bot/bot";

async function main() {
  startServer();

  await startBot();
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
