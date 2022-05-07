import { Router } from "express";
import * as fs from "fs";

export default function usersApi() {
  const router = Router();

  router.get("/", (req, res) => {
    res.send("Users sent!");
  });

  router.post("/", (req, res) => {
    res.send("Users updated!");
  });

  return router;
}
