import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use(
  "/api/*",
  cors({
    origin: "*",
    allowMethods: ["GET"],
    maxAge: 600,
    credentials: false,
  })
);

app.get("/api/", async (c) => {
  const query = c.req.query("query");
  console.log(`query: ${query}`);
  return c.json({ query: query });
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
