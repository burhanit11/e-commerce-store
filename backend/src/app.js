import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import usersRouter from "./routes/users.routes.js";
import categoryRouter from "./routes/category.routes.js";

const app = express();
let corsOptions = {
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  //   origin: "https://backend-greenmnid-52js.vercel.app"?,
  Credential: true,
  optionsSuccessStatus: 200,
};

// middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// api
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/product", categoryRouter);

export default app;
