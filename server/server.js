const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 4000;
const { PrismaClient } = require("@prisma/client");
const e = require("express");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { use } = require("passport");
var cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.Authorization;

  console.log("tocken", token);
  if (token) {
    console.log("token is present");
    try {
      const { email, password } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const [user] = await prisma.user.findMany({
        where: {
          email,
          password,
        },
      });
      console.log("user is authenticated");
      req.headers.user = user;
      next();
    } catch (e) {
      console.log("user is not athenticated, token is wrong");
      res.clearCookie("Authorization");
      res.send({ error: "you are not athenticated!" });
    }
  } else {
    console.log("token is missing from request");
    res.send({ error: "you are not athenticated!" });
  }
};
// app.use(authMiddleware);
app.use(
  cors({
    optionsSuccessStatus: 200,
    origin: "http://127.0.0.1:3000",
    credentials: true,
    maxAge: 360000,

    // allowedHeaders: [
    //   "Set-Cookie",
    //   "Content-Type",
    //   "Authorization",
    //   "Access-Control-Request-Headers",
    // ],
  })
);
app.use(
  expressSession({
    cookie: {
      sameSite: "none",
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: "a santa at nasa",
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);
app.get("/checkAuth", authMiddleware, async (req, res) => {
  res.send(req.headers.user);
});
app.get("/users", async (req, res) => {
  const allUsers = await prisma.user.findMany({});
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
app.get("/profile", authMiddleware, async (req, res) => {
  if (req.headers.user) {
    res.send(req.headers.user);
  } else {
    res.send("you need to authenticated first :) ");
  }
});
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  console.log("signin", req.body.email);
  const user = await prisma.user.findMany({ where: { email, password } });
  const authToken = jwt.sign({ email, password }, process.env.JWT_SECRET_KEY, {
    expiresIn: "2h",
  });
  res.cookie("Authorization", authToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 2 * 1000,
    sameSite: "none",
    path: "/",
    secure: true,
  });
  res.send({ user, error: false });
});
app.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  if (typeof email === "string" && typeof password === "string") {
    try {
      const result = await prisma.user.create({
        data: {
          email: email,
          password: password,
          name: name ? name : "erytery",
        },
      });
      res.send(result);
    } catch (e) {
      res.send({ error: "errror" });
    }
  } else {
    res.send({ error: "emailt or password should not be blank" });
  }
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
