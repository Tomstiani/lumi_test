import { Router } from "express";
import * as fs from "fs";

export default function usersApi() {
  const router = Router();

  router.get("/", (req, res) => {
    fs.readFile("./output.json", "utf8", (err, data) => {
      if (err) {
        res.status(500).send(err);
      }
      res.send(JSON.parse(data));
    });
  });

  router.post("/", (req, res) => {
    res.send("Users updated!");
  });

  return router;
}
