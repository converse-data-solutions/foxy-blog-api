import app from "./app";
import { logger } from "./config/winston.logger";
import { connectDB } from "./database/database";

const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    logger.info(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
