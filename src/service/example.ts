import { Result } from "../utils/result";
import { UserActiveShowDao } from "../dao/userActiveShowDao";
import { Autowired, Service } from "../utils/comment";

@Service()
export class UserActiveShowService {
  @Autowired(UserActiveShowDao)
  private uasd: UserActiveShowDao = new UserActiveShowDao();

  //折线图获取数据
  async getZxtData(data_name: string, uid: string, gameName: string) {
    const data = await this.uasd.getZxtData(data_name, uid, gameName);
    return new Result(data, "操作成功");
  }

}
