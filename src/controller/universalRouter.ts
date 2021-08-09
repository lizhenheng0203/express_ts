import { Request, Response } from "express";
import { Controller, Get, Autowired } from "../utils/comment";
import { UniversalService } from "../service/universalService";

@Controller()
class UniversalRouter {
    @Autowired(UniversalService)
    private uas: UniversalService = new UniversalService();

    //获取每个模块更新的时间
    @Get("/getEveryModuleDealTime")
    getEveryModuleDealTime(req: Request, res: Response) {
        const { gameCode: game_code, route } = req.query as any;
        return this.uas.getEveryModuleDealTime(game_code, route);
    }
}


export const universalRouter = (<any>new UniversalRouter())
    .router;
