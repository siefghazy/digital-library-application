import morgan from "morgan";
import cors from "cors";
import authRouter from "./modules/user/user.router.js";
import bookRouter from "./modules/book/book.router.js";
import { genreRouter } from "./modules/genre/router/routes.js";

export const bootstrap = (app, express) => {
  if (process.env.NODE_ENV === "dev") {
    app.use(morgan("dev"));
  }
  //CORS

  // const whiteList = ["http://127.0.0.1:5500"];
  // app.use((req, res, next) => {
  //   //Activate Account
  //   if(req.originalUrl.includes("/auth/confirmEmail")){
  //     res.setHeader("Access-Control-Allow-Origin", "*");
  //     res.setHeader("Access-Control-Allow-Methods", "GET");
  //     return next()
  //   }
  //   if (!whiteList.includes(req.header("origin"))) {
  //     return next(new Error("Blocked By CORS!"));
  //   }
  //   res.setHeader("Access-Control-Allow-Origin", "*");
  //   res.setHeader("Access-Control-Allow-Headers", "*");
  //   res.setHeader("Access-Control-Allow-Methods", "*");
  //   res.setHeader("Access-Control-Allow-Private-Networks", true);
  //   return next();
  // });
  app.use(cors());

  //END CORS

  app.use(express.json());
  app.use("/book", bookRouter);
  app.use("/auth", authRouter);
  app.use("/genre",genreRouter);
  app.use(express.static('uploads'))

  app.all("*", (req, res, next) => {
    return next(new Error("Page not found", { cause: 404 }));
  });
  app.use((error, req, res, next) => {
    return res
      .status(error.cause || 500)
      .json({ success: false, message: error.message, stack: error.stack });
  });
};
