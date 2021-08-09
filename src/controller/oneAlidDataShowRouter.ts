import { Request, Response } from "express";
import { Result } from "./../utils/result";
import { Controller, Get, Autowired } from "../utils/comment";
import { OneAlidDataShowService } from "../service/oneAlidDataShowService";

@Controller()
class OneAlidDataShowRouter {
  @Autowired(OneAlidDataShowService)
  private oadss: OneAlidDataShowService = new OneAlidDataShowService();

  //折线图获取数据
  @Get("/getOneAlidData")
  getOneAlidData(req: Request, res: Response) {
    const { alid, gameName } = req.query as any;
    return this.oadss.getOneAlidData(alid, gameName);
  }

  //获取某各联盟在世界地图的人员分布情况
  @Get("/getLeaguePersonMap")
  getLeaguePersonMap(req: Request, res: Response) {
    const { alid, gameName } = req.query as any;
    return this.oadss.getLeaguePersonMap(alid, gameName);
  }

  //获取世界地图的json
  @Get("/getWorldMapJson")
  getWorldMapJson(req: Request, res: Response) {
    return this.oadss.getWorldMapJson();
  }
}

export const oneAlidDataShowRouter = (<any>new OneAlidDataShowRouter())
  .router;
