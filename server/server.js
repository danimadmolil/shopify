const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 4000;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/users", async (req, res) => {
  const allUsers = await prisma.user.findMany();
  // prisma
  res.json({ data: allUsers });
});
app.post("/user", async (req, res) => {
  console.log({ ...req.body });
  try {
    const result = await prisma.user.create({
      data: {
        ...req.body,
      },
    });
    console.log("result", result);
  } catch (e) {
    console.log("error");
  }
});
app.delete("/user/:userId", async (req, res) => {
  try {
    const result = await prisma.user.delete({
      where: { id: Number(req.params.userId) },
    });
    console.log("result", result);
  } catch (e) {
    console.log("error to delete user ");
  }
});
app.post("/menu", async (req, res) => {
  const result = await prisma.menu.create({ data: req.body });
  // console.log("prisma", req.body);
  res.jsonp(result);
});
app.get("/menu", async (req, res) => {
  console.log("subMenuss", generateInclued(5));
  const result = await prisma.menu.findMany({
    where: {
      parentMenu: null,
    },
    include: {
      subMenu: {
        include: {
          subMenu: {
            include: {
              subMenu: {
                include: {
                  subMenu: {
                    include: {
                      subMenu: {
                        include: {
                          subMenu: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
  // const data = [
  //   ...result.map((item) => ({ ...item, subMenu: { ...item.subMenu } })),
  // ];
  // result.data.forEach((item) => {});
  // console.log(data);
  res.send({ data: result });
});
//default response
app.use((req, res) => {
  res.jsonp({ error: "404 NotFound" });
});
app.listen(PORT, () => console.log("Server is running at prot" + PORT));
