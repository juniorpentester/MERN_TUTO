import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./src/routes/notesRoutes.js";
import { connectToMongoDB } from "./src/config/db.js";
import rateLimiter from "./src/middleware/rateLimiter.js";

dotenv.config();
const app = express();

//middlewares
app.use(
  cors({
    origin: "http://localhost:5006",
  }),
);
app.use(express.json());
app.use(rateLimiter);

//server port
const PORT = process.env.PORT;

//notes routes
app.use("/api/notes", notesRoutes);

/* good practice suggest that we connect to the db then run the server, not the inverse. */
// connectToMongoDB();

// app.listen(PORT, () => {
//   console.log(`server is running on http://localhost:${PORT}`);
// });

connectToMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
  });
});
