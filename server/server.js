import express from "express";
import * as path from "path";
import usersApi from "./usersApi.js";

const app = express();

app.use(express.static("../client/dist/"));

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

app.use("/api/users", usersApi());

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Server is running! Listening on http://localhost:${
      process.env.PORT || 3000
    }`
  );
});
