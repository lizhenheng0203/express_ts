import { Request, Response } from "express";
import { Controller, Get, Autowired } from "../utils/comment";
import { UserActiveShowService } from "../service/userActiveShowService";

@Controller()
class UserActiveShowRouter {
    @Autowired(UserActiveShowService)
    private uas: UserActiveShowService = new UserActiveShowService();

    //折线图获取数据
    @Get("/getZxtData")
    getZxtData(req: Request, res: Response) {
        const { data_name, uid, gameName } = req.query as any;
        return this.uas.getZxtData(data_name, uid, gameName);
    }
}


export const userActiveShowRouter = (<any>new UserActiveShowRouter())
    .router;
