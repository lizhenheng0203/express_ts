import { Request, Response } from "express";
import { Controller, Get, Autowired, Post } from "../utils/comment";
import { ConfigService } from "../service/configService";
import { nanoid } from 'nanoid'

@Controller()
class ConfigRouter {

    @Autowired(ConfigService)
    private uas: ConfigService = new ConfigService();

    //配置文件的历史记录
    @Get("/getUploadHistoryData")
    getUploadHistoryData(req: Request, res: Response) {
        //判断是什么游戏，来获取相应得配置文件
        const { gameName } = req.query as any;
        return this.uas.getUploadHistoryData(gameName);
    }

    //上传历史记录回退
    @Post("/rollbackHistoryData")
    rollbackHistoryData(req: Request, res: Response) {
        //判断是什么游戏，来获取相应得配置文件
        const { gameName, info: { data, id }, info } = req.body as any;
        return this.uas.saveUploadConfigInfo(gameName, data, { ...info, uploadType: '回滚历史记录', id: nanoid(), description: '回退记录的唯一标识为：' + id }, res);
    }

    //上传配置文件信息
    @Post("/saveUploadConfigInfo")
    saveUploadConfigInfo(req: Request, res: Response) {
        //判断是什么游戏，来获取相应得配置文件
        const { outdata, frontData, gameName, info, info: { uploadType: saveWay } } = req.body as any;
        return this.uas.saveUploadConfigInfoService(outdata, frontData, gameName, info, saveWay);
    }

    //获取行为节点配置数据
    @Get("/getConfigData")
    getConfigData(req: Request, res: Response) {
        //判断是什么游戏，来获取相应得配置文件
        const { gameName } = req.query as any;
        return this.uas.getConfigData(gameName);
    }

    //获取展示的行为节点配置数据
    @Get("/getConfigShowData")
    getConfigShowData(req: Request, res: Response) {
        //判断是什么游戏，来获取相应得配置文件
        const { gameName } = req.query as any;
        return this.uas.getConfigShowData(gameName);
    }

    //保存前台传过来的配置数据到文件
    @Post("/saveEndData")
    saveEndData(req: Request, res: Response) {
        //判断是什么游戏，来获取相应得配置文件
        const { gameName, data } = req.body as any;
        return this.uas.saveEndData(gameName, data);
    }
    
}


export const configRouter = (<any>new ConfigRouter())
    .router;
