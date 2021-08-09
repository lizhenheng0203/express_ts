import { Result } from "../utils/result";
import { OneAlidDataShowDao } from "../dao/oneAlidDataShowDao";
import { Autowired, Service } from "../utils/comment";
import worldCenter from "../config/world_center.json";

@Service()
export class OneAlidDataShowService {
  @Autowired(OneAlidDataShowDao)
  private oadsd: OneAlidDataShowDao = new OneAlidDataShowDao();

  //表格获取数据
  async getOneAlidData(alid: string, gameName: string) {
    const data = await this.oadsd.getOneAlidData(alid, gameName);
    const finishData = await this.dealOneAlidData(data)
    return new Result(finishData);
  }

  //处理数据
  dealOneAlidData(data: any) {
    let obj: any = {}
    let keys = Object.keys(data[0])
    for (let i in data) {
      for (let key of keys) {
        obj[key] == undefined && (obj[key] = [])
        obj[key].push(data[i][key])
      }
    }
    return obj
  }

  //获取某各联盟在世界地图的人员分布情况
  async getLeaguePersonMap(alid: string, gameName: string) {
    const data = await this.oadsd.getLeaguePersonMap(alid, gameName);
    const finishData = await this.dealLeaguePersonMap(data)
    return new Result(finishData.sort((a:any,b:any) => b.value - a.value));
  }

  //地图的数据处理
  dealLeaguePersonMap(data: any) {
    const wcc: any = worldCenter
    let obj: any = []
    for (let i in data) {
      // console.log(i)
      // obj[i] || (obj[i] ={})
      obj[i] = data[i]
      for (let j in wcc.features) {
        if (data[i].name == wcc.features[j].properties.name) {
          obj[i] = { ...data[i], ...wcc.features[j].properties }
        }
      }
    }
    return obj
  }

  //获取世界地图的json
  getWorldMapJson() {
    return new Result(worldCenter)
  }
}
