import { Router } from "express";
import { oneAlidDataShowRouter } from "./oneAlidDataShowRouter";
import { universalRouter } from "./universalRouter";
import { configRouter } from "./configRouter";

class Routers {
    public router: Router
    constructor() {
        this.router = Router()
        //此处statistics可修改为其他字符串
        this.router.use('/statistics', oneAlidDataShowRouter)
        this.router.use('/statistics', universalRouter)
        this.router.use('/config', configRouter)
    }
}

export const router = (new Routers()).router