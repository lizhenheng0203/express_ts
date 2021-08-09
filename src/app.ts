import express from 'express'
import { Application, Router } from 'express'
import { router } from './controller/'
import { Middleware } from './utils/middleware'

// import { DaoTest } from './dao/test'

export class App {
    //express实例
    private app: Application
    //端口号
    private port: number
    //路由
    private router: Router

    constructor(port: number) {
        this.app = express()
        this.router = Router()
        this.port = port
        this.initializeMiddleware()
        this.initializeRouter()
        this.startApp()
    }

    //加载中间件
    initializeMiddleware() {
        new Middleware(this.app).useMiddleWare()
    }

    initializeRouter(): void {
        this.app.use('/node', router)
    }

    //启动项目
    startApp(): void {
        this.app.listen(this.port, () => {
            console.log(`端口号为:${this.port}的服务启动成功`)
        })
    }
}