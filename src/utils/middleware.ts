import { Application } from "express";
import * as express from "express";
import cors from "cors";

export class Middleware {
  //服务
  private app: Application;
  constructor(app: Application) {
    this.app = app;
  }

  //添加中间件
  useMiddleWare() {
    this.app.all("*", function (req, res, next) {
      // console.log("123", req.url);
      next();
    });

    //跨域处理
    // let whitelist = ["http://127.0.0.1:8018", "http://127.0.0.1:8088"];
    // let corsOptions = {
    //   origin: function (origin:string, callback:Function) {
    //     if (whitelist.indexOf(origin) !== -1) {
    //       callback(null, true);
    //     } else {
    //       callback(new Error("Not allowed by CORS"));
    //     }
    //   },
    //   credentials: true,
    // };

    // this.app.use(cors(corsOptions));
    this.app.use(cors());

    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(express.urlencoded({ limit: "50mb", extended: true }));
  }
}
