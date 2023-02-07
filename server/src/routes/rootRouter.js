import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import pizzaPlaceRouter from "./api/v1/pizzaPlaceRouter.js";
import uploadsRouter from "./api/v1/uploadsRouter.js";
const rootRouter = new express.Router();

rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/pizza-places", pizzaPlaceRouter);
//place your server-side routes here
rootRouter.use("/api/v1/uploads", uploadsRouter);

rootRouter.use("/", clientRouter);

export default rootRouter;

