const express = require("express");
const app = express();
const PORT = 4000;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.get("/users", async (req, res) => {
  const allUsers = await prisma.user.findMany();
  // prisma
  res.json({ data: allUsers });
});

//default response
app.use((req, res) => {
  res.jsonp({ error: "404 NotFound" });
});
app.listen(PORT, () => console.log("Server is running at prot" + PORT));
