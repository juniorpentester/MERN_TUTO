import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import notesRoutes from "./src/routes/notesRoutes.js";
import { connectToMongoDB } from "./src/config/db.js";
import rateLimiter from "./src/middleware/rateLimiter.js";

dotenv.config();
const app = express();
//server port
const PORT = process.env.PORT;

//dirname
const __dirname = path.resolve();

//middlewares cors if we are not in production
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5006",
    }),
  );
}

app.use(express.json());
app.use(rateLimiter);

//notes routes
app.use("/api/notes", notesRoutes);

//add a path configuration to serve the frontend build files in production mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/ToDos/dist")));

  app.get("{*any}", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend", "ToDos", "dist", "index.html"),
    );
  });
}

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
