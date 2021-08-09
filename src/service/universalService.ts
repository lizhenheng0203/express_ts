import { Result } from "../utils/result";
import { UniversalDao } from "../dao/universalDao";
import { Autowired, Service } from "../utils/comment";
import { getDealTimeToken, getDealTime } from "../api/universalApi"

@Service()
export class UniversalService {
  
  @Autowired(UniversalDao)
  private universalDao: UniversalDao = new UniversalDao();

  //获取每个模块更新的时间
  async getEveryModuleDealTime(game_code: string, route: string) {
    const userInfo = { 'username': 'leyi', 'password': 'Leyi123!@#' }
    const { data:resToken }: any = await getDealTimeToken(userInfo)
    const { access_token: token } = resToken
    const headers = { 'accept': 'application/json', Authorization: 'Bearer ' + token }
    const params = { game_code, route }
    const { data }: any = await getDealTime(params, headers)
    return new Result(data);
  }

}
